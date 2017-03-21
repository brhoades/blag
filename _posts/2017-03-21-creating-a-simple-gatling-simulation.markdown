---
layout: post
title:  "Creating a Gatling Simulation"
date:   2017-03-21 07:41:00 -0600
categories: gatling simulation getting started
---

Background
----------
I've written this as an aid for someone completely new to Gatling. I could not find material online
which contained any "getting started" information for the latest version of Gatling that
targeted someone without a great deal of functional experience. This is not comprehensive; I just hope
this serves as a starting point to jump off to official documentation.

I've provided a set up Gatling project to help follow along [here](https://github.com/brhoades/example-gatling-simulation).

Recommended Reading
-------------------
[What is functional programming](http://blog.jenkster.com/2015/12/what-is-functional-programming.html)

[Scala documentation](https://www.scala-lang.org/documentation/)

[Gatling documentation](http://gatling.io/docs/current/)


Manually Creating a Simple Simulation
-------------------------------------
Structuring a simulation is defined at length [here](http://gatling.io/docs/current/general/simulation_structure/), but a minimal functioning example helps illustrate this:

```scala
package simpleexample

import io.gatling.core.Predef._
import io.gatling.http.Predef._

class ExampleSimulation extends Simulation {
  val httpConf = http
    .baseURL("https://google.com")
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
    .doNotTrackHeader("1")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0")

  val scn = scenario("Scenario Name")
    .exec(http("Main Page")
      .get("/"))

  setUp(scn.inject(atOnceUsers(1)).protocols(httpConf))
}
```

This simulation loads https://google.com/ with the provided HTTP headers with a single user.
The Simulation above describes a single scenario, although there can be many. This scenario
has a single HTTP chain "Main Page"; it visits `/` relative to the baseURL described in
our `httpConf`.

The `setUp` function called at the end of the class definition is what defines the simulation's execution
parameters. In this case, a single user immediately begins the scenario, walking through the single
step of getting `/`. There are many other options for defining
[how user(s) enter the simulation](http://gatling.io/docs/current/session/feeder/) and
[at what rate they enter the simulation](http://gatling.io/docs/current/general/simulation_setup/).

The output of the example simulation above is the following:

```
Simulation simpleexample.ExampleSimulation started...

================================================================================
2017-03-15 12:47:51                                           2s elapsed
---- Requests ------------------------------------------------------------------
> Global                                                   (OK=2      KO=0     )
> Main Page                                                (OK=1      KO=0     )
> Main Page Redirect 1                                     (OK=1      KO=0     )

---- Scenario Name -------------------------------------------------------------
[##########################################################################]100%
          waiting: 0      / active: 0      / done:1
================================================================================

Simulation simpleexample.ExampleSimulation completed in 0 seconds
Parsing log file(s)...
Parsing log file(s) done
Generating reports...

================================================================================
---- Global Information --------------------------------------------------------
> request count                                          2 (OK=2      KO=0     )
> min response time                                    159 (OK=159    KO=-     )
> max response time                                    477 (OK=477    KO=-     )
> mean response time                                   318 (OK=318    KO=-     )
> std deviation                                        159 (OK=159    KO=-     )
> response time 50th percentile                        318 (OK=318    KO=-     )
> response time 75th percentile                        398 (OK=398    KO=-     )
> response time 95th percentile                        461 (OK=461    KO=-     )
> response time 99th percentile                        474 (OK=474    KO=-     )
> mean requests/sec                                      2 (OK=2      KO=-     )
---- Response Time Distribution ------------------------------------------------
> t < 800 ms                                             2 (100%)
> 800 ms < t < 1200 ms                                   0 (  0%)
> t > 1200 ms                                            0 (  0%)
> failed                                                 0 (  0%)
================================================================================

Reports generated in 0s.
Please open the following file: target/gatling/examplesimulation-1489600069122/index.html
[info] Simulation ExampleSimulation successful.
[info] Simulation(s) execution ended.
[success] Total time: 8 s, completed Mar 15, 2017 12:47:52 PM
```

Extended report information can be found in the linked report HTML file. Simulation status
is output while the simulation runs, displaying the number of errors with their details, if
there are any.

It can be seen that when visiting the site's root, a redirect occurred. By default, Gatling
follows all redirects on an HTTP chain and labels them as "Name - Redirect #". This behavior
can disabled globally, per chain, and capped. More information about redirect configuration
[here](http://gatling.io/docs/current/http/http_protocol/#follow-redirects).

### Chaining Requests
In the example simulation above, there was a single request to a single page. Typically in
simulations there will be more than one request. As each call to exec returns the modified
scenario object, scenarios can be chained to perform more complex behaviors.

```scala
// ...
  val scn = scenario("Scenario Name")
    .exec(http("Main Page")
      .get("/"))
    .exec(http("Search")
      .get("/?q=Some+Query"))
// ...
```

This scenario now also runs a search, visiting https://google.com/?q=Some+Query . The HTTP
protocol supports POST requests, cookies, redirects, and more complex configurations with proxies.
Further information is also available on the [official documentation page](http://gatling.io/docs/current/http/).

### Assertions
Assertions can be used to verify that responses contain expected content. One of the most basic
assertions is for status codes. For example, if we we wanted our scenario to verify that
the Google main page returned HTTP200:

```scala
// ...
  val scn = scenario("Scenario Name")
    .exec(http("Main Page")
      .get("/")
      .check(status.is(200)))
    .exec(http("Search")
      .get("/?q=Some+Query"))
// ...
```

If there was not an HTTP200, the scenario would print the name of the request, `'Main Page'`, and state
the expected and found status codes. This would count as a KO in the statistics output as well:

```
...
> Global                                                   (OK=1      KO=1     )
> Main Page                                                (OK=0      KO=1     )
> Search                                                   (OK=1      KO=0     )
...
```
Which signifies that this particular request failed to pass validation. **Note that the simulation
continues** even though there was a failure at a prior step. There are
[methods which work around this](http://gatling.io/docs/current/general/scenario/#exithereiffailed),
which can be useful when authentication fails.

CSS selectors are also used to verify content on pages. For example, if we wanted to ensure
that the main page had an `html` node with the attribute `size` set to `mobile`:

```scala
// ...
  val scn = scenario("Scenario Name")
    .exec(http("Main Page")
      .get("/")
      .check(status.is(200))
      .check(css("html[size]", "mobile").exists))
// ...
```

A great deal of other assertions exist for optionality, performance, header values,
performance requirements, etc. More details are available
[here](http://gatling.io/docs/current/general/assertions/).


### Session Modification and Inspection
Sessions are implicitly passed between each exec call. They can manually inspected or modified
during scenario definition by executing a custom function with exec.

```scala
// ...
  val scn = scenario("Scenario Name")
    .exec(http("Main Page")
      .get("/"))
    .exec(session => {
      println(session)
      session
    })
    .exec(session => session.set("hello", "bla"))
    .exec(session => {
      println(session)
      session
    })
// ...
```

Above is the same scenario as our first one. However, this scenario prints the session,
sets "hello" in the session to "bla", then prints it again. *Note: if you are not sure why
session is being repeated after printing it, try to only print it and see what happens.*

Here is the output:

```scala
Simulation simpleexample.ExampleSimulation started...
Session(Scenario Name,
1,
Map(
  gatling.http.cache.dns -> io.gatling.http.resolver.ShuffleJdkNameResolver@582701e2,
  gatling.http.cache.redirects -> io.gatling.core.util.cache.Cache@2c5ead52,
  gatling.http.cookies -> CookieJar(
  Map(
    CookieKey(nid,google.com,/) -> StoredCookie(NID=99=SkqwEzuPt4c2J-cwZMPjX0rPxHeZHWTiDaeyEvQr-82Dh0NlSie_-trLh9SO9OfYVed4nShyQv0wFIWUnyCDsshfjsEgE0M5eYT_W3Hn2Jm20vxV56nyq4q7uRvM96bP8qnL_HPAfiMH2fXb4w; domain=.google.com; path=/; HTTPOnly,false,false,1489611434846))),
  gatling.http.referer -> https://www.google.com/),
  1489611433728,
  42,
  OK,
  List(),
  io.gatling.core.protocol.ProtocolComponentsRegistry$$Lambda$149/418118518@c4d1ae6)

Session(Scenario Name,
  1,
  Map(
    gatling.http.cache.dns -> io.gatling.http.resolver.ShuffleJdkNameResolver@582701e2,
    gatling.http.cache.redirects -> io.gatling.core.util.cache.Cache@2c5ead52,
    gatling.http.cookies -> CookieJar(Map(
      CookieKey(nid,google.com,/) -> StoredCookie(NID=99=SkqwEzuPt4c2J-cwZMPjX0rPxHeZHWTiDaeyEvQr-82Dh0NlSie_-trLh9SO9OfYVed4nShyQv0wFIWUnyCDsshfjsEgE0M5eYT_W3Hn2Jm20vxV56nyq4q7uRvM96bP8qnL_HPAfiMH2fXb4w; domain=.google.com; path=/; HTTPOnly,false,false,1489611434846))),
  gatling.http.referer -> https://www.google.com/,
  "hello" -> "bla"),
  1489611433728,
  42,
  OK,
  List(),
  io.gatling.core.protocol.ProtocolComponentsRegistry$$Lambda$149/418118518@c4d1ae6)
```

In between the first and second session output, I set "hello" to "bla" which can be see in the second session.
This is the primary mechanism to inspect and modify the session from the level of scenario definition.

Individual http chains, where requests are made, can also save and read from the session by
[assertions](http://gatling.io/docs/current/general/assertions/).
[saveAs](http://gatling.io/docs/current/http/http_check/#http-check-saving) serves as a session-saving
mechanism which allows conditional branching, posting form data, and more.

Recording a Simulation
----------------------
Gatling also supports recording simulations using its
[HTTP recorder](http://gatling.io/docs/current/http/recorder/). It acts as a proxy which records
all traffic between a browser and a server and then saves it into a simulation. If the target
website is not https or a custom, self-signed certificate can be used, this method
of creating simulations is ideal.

Distribution
------------
Gatling plugins exist for both [sbt](http://gatling.io/docs/current/extensions/sbt_plugin/) and
[Gradle](https://github.com/lkishalmi/gradle-gatling-plugin). Both work very well, however the sbt
plugin is an official extension to Gatling and contains the most comprehensive documentation and examples.
Unless Gatling is being added to an existing Gradle project, I would highly recommend using the sbt
extension. As the [official documentation](http://gatling.io/docs/current/extensions/sbt_plugin/) does
not explicitly state this, here is a minimal collection of files to get an sbt project running:

Your project tree, for a standalone sbt project, should look similar to this:
```
├── build.sbt
├── project
│   ├── build.properties
│   └── plugins.sbt
└── src
    └── test
        ├── resources
        └── scala
            └── simpleexample
                └── ExampleSimulation.scala
```

build.sbt
```
enablePlugins(GatlingPlugin)

scalaVersion := "2.11.8"

scalacOptions := Seq(
  "-encoding", "UTF-8", "-target:jvm-1.8", "-deprecation",
  "-feature", "-unchecked", "-language:implicitConversions", "-language:postfixOps")

libraryDependencies += "io.gatling.highcharts" % "gatling-charts-highcharts" % "2.2.4" % "test,it"
libraryDependencies += "io.gatling"            % "gatling-test-framework"    % "2.2.4" % "test,it"

addCompilerPlugin("org.psywerx.hairyfotr" %% "linter" % "0.1.17")
```

project/build.properties
```
sbt.version=0.13.13
```

project/plugins.sbt
```
addSbtPlugin("io.gatling" % "gatling-sbt" % "2.2.1")
```

Once the above files are set up, install sbt and run:
```bash
$ sbt
```

Then simulations may be run either from the sbt shell:
```
$ sbt
> gatling:testOnly somepackage.GeneralBrowse
```

Or, instead, from your shell:
```
$ sbt "gatling:testOnly somepackage.GeneralBrowse"
```

The reports can be found in `/target/gatling/` and the last report can be opened in a web browser
with:
```
$ sbt gatling:lastReport
```

A list of all sbt tasks are available [here](http://gatling.io/docs/current/extensions/sbt_plugin/).

Reference Material
------------------

[Gatling cheat sheet](http://gatling.io/docs/current/cheat-sheet/)
