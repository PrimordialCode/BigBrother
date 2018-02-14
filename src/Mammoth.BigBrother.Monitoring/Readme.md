# Notes

- The concept of 'Session' should be handled by the actual Monitoring System implemented, but basically every time we run a new instance of the application we open a session.

metric might be in the form:

generic (counters):

- actor.created
- actor.restarted
- actor.stopped

message (counters):

- message.received
- message.deadletters
- message.unhandled
- message.elapsed
- message.failure

at each metric we attach a dictionary containing additional information to provide advanced grouping
[actor: the id of the actor]
[message: the message that was processed]
[exception: the exception in case of failure]

cunters and gauges...can we attach those metrics?

we can then provide custom functions to aggregate the data given the information we passed
