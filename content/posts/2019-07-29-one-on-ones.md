---
title: "One-on-Ones Are Mandatory"
date: 2019-07-29
categories:
  - management
  - one-on-ones
---

One on ones are one of the most important tools that a manager has. You either have effective, regular, clear 1-on-1s or you pay in employee retention, satisfaction, and development.

# Why are you writing this?
As an engineer, 1-on-1s were important to me. They gave an opportunity to bring topics to my manager that otherwise didn't have an outlet, receive and provide feedback, and track successes and failures throughout the year. Unfortunately, 1-on-1s aren't mandatory at Cerner; yet for me, they were the reason that I hit 2 years and became a team lead.

Today, I manage a team that handles high priority client requests while simultaneously on-boarding new engineers (365 days/yr support). I could not have survived the last year and on-boarded 5 engineers without regular, effective 1-on-1s. Now that I'm on the opposite side of 1-on-1s, I can see the traps managers fall into that lead 1-on-1s to doom:
 * Rescheduling, pushing back, and cancelling as something "critical" came up.
 * Ending early / starting late frequently.
 * Neither participant drives or the meeting is too unstructured.
 * Conversation and information is one way.
 * Surface-level topics and recent events are discussed.

## One-on-Ones Are Bidirectional
Misleading my reports into believing that 1-on-1s are their meetings communicates what I want out of the meeting. Overall, the meetings are mine and mandatory; but it is for my report's growth to our team's benefit. My intention in "giving" them the meeting is to set the stage that this meeting doesn't exist without them and that they set the agenda.

### One-on-Ones Need Structure and Regularity
I meet weekly for about an hour each with each of my reports in a private space. We have a meeting document for minutes, with a template that my report fills out in advance:

```markdown
## Date: YYYY/MM/DD
### What's going on? What have you completed?
  * 

### What have you learned?
  * 

### What's going well? Anything to brag about?
  * 

### What's blocking / challenging you? What can we improve?
  * 

### Feedback from [[manager]]:
  * 

### Feedback from [[report]]:
  * Flip:
    * First meeting of the month: revisit goals, achievements,
      and areas of opportunity.
    * Second meeting of the month: manager reflection.

### Other topics / action items:
  * Review feedback and TODOs from last meeting.
```

This template provides a clear agenda and reduces the amount of time spent digging. If the agenda isn't filled out in advance, you must pressure them to recollect for each section. Honestly, it usually isn't filled out ahead of time and they fill it out as I walk to the meeting room. This template also varies for each report; the question "What have you learned?" provides little value to more senior engineers versus a college apprentice.

The top half of this template serves as minutes for our 1-on-1s. The contents of these sections are conversation starters: focus on the hows and whys over the whats. 1-on-1s are **not** long-form scrums. I dig into these bullets with questions like:
 * How was that? Did you enjoy it?
 * Would you want to do it again, knowing what you know now? How would you change your execution?
 * Did you do that without assistance?
 * What can we do to make other tasks [not] like that?
 * Is there anything I can do to help next time?
 * Everything else went awesome/terrible?
 * Digging: you didn't work on anything else this sprint, just \<single item\>? You didn't learn anything else?

### Feedback and Expectations
The most important two sections of the 1-on-1 template cover feedback. I can't talk about feedback without giving the three steadfast rules of feedback:
 * You aren't giving enough of it.
 * It's not feedback unless it's constructive, agreed upon, and makes things better.
 * You still aren't giving enough of it.

#### Positive Feedback, Morale, and Timing
[![feedback comic](/assets/images/oneonones-feedback.png)](/assets/images/oneonones-feedback.png)
*Julie Zhuo, **The Making of a Manager***

This comic summarizes an important point Julie Zhuo makes about feedback in [_The Making of a Manager_](https://www.amazon.com/Making-Manager-What-Everyone-Looks/dp/0735219567). People want to succeed, but it's hard to without knowing where they stand. Positive feedback should come easy to a manager and you should have a lot of it. It can go from "I couldn't run this team without you" to "I can tell you are struggling but really trying hard: keep at it." Positive feedback doesn't need to mention specific events or even be given at 1-on-1s.

**You must give positive feedback**. The amount will vary and it's an art; some people know where they're at while others need regular pep talks. Whatever it takes, your reports should leave 1-on-1s with an impression of where they sit in your eyes. If they only learn where they sit with you when raises come out, **you have failed them as a manager**. Whether you're meeting expectations should never be a surprise for anyone. By waiting until the of the cycle, you have stolen your report's agency to improve or raise the bar. Your report likely spent the year feeling uneasy about where they stand in your eyes.

#### Negative Feedback
Negative feedback is harder than positive feedback for a variety of reasons:
 * Atmosphere and relationship with your report must allow for a _conversation_ about their faults and mistakes.
 * Situational feedback must be given shortly after an event or else it reads passive aggressive.
 * Hopefully a nonzero amount of your reports exceed you in some domain and utilize those skills, leaving you groping for feedback in the dark.
 * Confrontation is simultaneously uncomfortable and critical.
 * Presenting feedback well is like making food that tastes _and_ looks good.


##### Atmosphere and Relationship
Poor meeting atmosphere or report relationship is the hardest issue to overcome. For me, I always open any major feedback with a variant of the following:
> I am about to give you constructive feedback. I've spent a lot of time on this because I care about your development and want you to be awesome.
> I'll give you details about this feedback and why you are getting it, then you'll have a chance to discuss it and agree or disagree with me.

Depending on how your relationship is, you may leave out agreement. For all relationships, keep in mind that if your report doesn't agree with your feedback, they likely won't incorporate it.

I've also found that prepping your reports for hard feedback becomes easier if you set expectations in a prior meeting (even the last meeting). Tell them exactly what you expect out of them with some solid metrics. For example:

> I expect that you:
>   * Will be self-sufficient with coding. If you ask someone senior to you a coding question and they answer it in less than a minute, you are not meeting expectations.
>   * Will finish 3 points of work a sprint. We can discuss specifics around larger stories / shorter sprints when they come up. If you are assigned something that isn't a 3 pointer but is marked as one, you should yell loudly.
>   * Will sign off (or comment why you will not) on every code review that is assigned to you.

This gives them a cold splash of water without outright telling them that they are not meeting some invisible expectations. At the next meeting, they are either doing great and you revisit the expectations for praise or you give them the feedback you had planned. Either way, _no surprises_. Setting expectations is critical to delivering effective and usable feedback.

##### Situational Feedback

The solution to other non-relationship feedback difficulties is simpler: give more of it, more often, and ask them if you are correct. Aim for quantity, people are really good at sifting through noisy data and engineers are especially good at arguing. I can easily say that most of my feedback is less wide-reaching than outright failing to meet expectations. Zhuo has a clever way of splitting feedback up into three categories, two I'll steal: situational feedback and behavioral feedback.

Situational feedback is task-specific or accident-based. A report made a notable a mistake on a code review? I didn't expect you to do this, let's talk about it and how we can improve. This is fairly easy to do but it must be delivered early. A good rule of thumb for how early is to literally follow your gut. Feedback urgency is directly proportional to how uncomfortable it makes you to deliver.

##### Behavioral, Second-Order Feedback

Behavioral feedback is more difficult; it's second-order feedback which requires taking a step back and looking at trends. Like some poetry, behavioral feedback should have [a rhyme to it](https://en.wikipedia.org/wiki/Metre_(poetry)). You should look for patterns in past feedback which could be brought to their attention. Some real examples:

 1. Report routinely spends more time correcting their spelling and grammatical mistakes than fixing technical issues in technical documents.
 1. Report is having issues getting work completed in the last few sprints. You've observed multiple times that they tend to work really fast the night before the end of the sprint.
 1. Report always seems nervous, avoids eye contact, and shuffles to and from their desk with eyes down. You probably haven't called this out before.

It's easy when it's written out like this, but these issues are summaries of problems that spanned multiple months. Once you put the patterns together, you call out set of actions to address this:

 1. *Communication skills*. Specifically: review your documents multiple times prior to sending them out. Run them through TTS, note the mistakes you make in a notebook, and check the list of mistakes prior to sending the next document out .
 1. *Time management*. Set clear mid sprint deadlines for stories and decrease the complexity of their stories until they reach it. Force them to front-load their work effort by making them work late.
 1. *Soft/interpersonal* skills. Tell them what they're doing and how it'll affect them in the long run. Make sure they understand your intentions and that you don't expect a 2 week turnaround.
 
Also like poetry, if feedback rhymes too much it gets bad. If your situational and behavioral feedback has a strong rhyme, it's time to move from being a peacetime manager to a wartime manager.

#### Gathering Feedback
Feedback should come easily if you are involved with your report's day-to-day activities. Otherwise, it's hard and you must rely on others. Regardless, you should be reaching out to your peers and your report's peers with regularity. Gather multiple sources and keep them anonymous to your report; you do not want them to feel like they need to be careful around specific individuals.

Do not ask "Do you have any feedback for \<report\>?" If you get something out of that, it's going to be festering, stale feedback. You must ask pointed questions, piecemeal, in a conversation to avoid overwhelming them. Some example questions:
 * What could they do today to be better?
 * How often do you speak with them? Is that too much or too little?
 * Do you like working with them? Why or why not?
 * What do they do that grates on you? How about impresses you?
 * Where would you rank them relative to \<known exceptional employee\>? How about \<rising star employee\>?
 * What can I do to make them a better coworker?
 * Have they done anything this week that really floored / bothered you?
 * Have they done anything this week that really impressed you?

### Manager Feedback
1-on-1s should be bidirectional. You spend the first part of 1-on-1s digging for the known unknowns and discussing them. The free time at the tail end of the meeting should be dedicated to finding the unknown unknowns. On odd meetings, we reflect on *my* performance as a manager. After all, my reports' fates are intertwined with the quality of my management; if I'm doing an awful job they'll likely fail with me.

Here are questions I ask every other 1-on-1:
 * What could I do to make your job awesome?
 * How am I doing and how could I be doing better?
 * If you had your pick at the company, who would you want to be your manager and why?
 * What should *we* be doing that we are not?
 * If I gave you carte blanche this sprint, what would you do for two weeks?
 * Are there any questions that I'm not asking you that I should be?

These questions mean nothing if your report feels like they will be penalized for their answers. Make sure they are aware this isn't a manager/report discussion, but rather a you/them discussion. If the thought of asking any of these questions makes you uncomfortable or afraid, you need to ask them. **Now.** That discomfort is a signal that you know something will be brought up.

At worst, these questions allow reports to feel heard. At best, these questions are a source of discussion, feedback from people who experience your job performance, and make you aware of what's going well or poorly in your organization.

### Accountability - Other Topics
Other topics always carry an item to discuss previous TODOs and feedback from previous meetings. This is a reminder for you and your report that you will revisit feedback and expectations each meeting. Leaf through the last month of 1-on-1s and bring up any feedback, discussions, and action items that are still relevant.

## Summary
> 1. Being a good company doesn’t matter when things go well, but it can be the difference between life and death when things go wrong.
> 2. Things always go wrong.
> 3. Being a good company is itself an end.

Ben Horowitz, [A Good Place to Work](https://a16z.com/2012/08/18/a-good-place-to-work/)

Being too busy to have 1-on-1s is the same as being too thirsty to drink. You will be busy when an employee quits due to a circumstance that could have been identified and rectified. When you have to onboard a new hire, you'll sacrifice team capacity to get them up to speed. When a senior engineer leaves, you'll get their work and distribute it to teammates.

You can't cancel 1-on-1s when something critical comes up. Something is always wrong, something is always on fire, something will always be critical. Nothing is more important than your people. Unlike individual events, people are a constant. You can prevent fires by training, growing, and building relationships your people. You can delegate critical things to people that you trust and have established relationships with.

1-on-1s are an end to a potential death spiral of being busy, fighting fires, having unhappy employees, and losing important people.

## Extra Reading
 * [A Good Place to Work](https://a16z.com/2012/08/18/a-good-place-to-work)
 * [The Hard Thing about Hard Things](https://www.amazon.com/Hard-Thing-About-Things-Building-ebook/dp/B00DQ845EA)
 * [The Making of a Manager: What to Do When Everyone Looks to You](https://www.amazon.com/Making-Manager-What-Everyone-Looks-ebook/dp/B079WNPRL2)
