# Metrics

- Counter:
- Gauge:
- Timing: information like: "how much time it took to perform an operation".
- Event: something that happened.
- Exception: pretty obvious.

## Metrics Properties

Each metric has a dictionary of properties attached to it, so we can provide additional dynamic information that can be used to further qualify the tracked information.
It can be useful for querying or categorize the metric values.

Since the metric information are stored locally to not overload / pollute the system we add the bility to each metric entry to "expire";
this will result in a Time To Live (TTL) applied to some metrics.

We'll mark metrics that will be subject to expiration, an house-keeping service will remove expired entries according to configurable rulesets and strategies.

TTL strategies can be:

- an "expiration timestamp"
- an "aging factor": only the last N values of the same metric will be kept (conditions to find out which entries belong to the same group might involve using the dynamic properties).

If no TTL information is provided, the metric is supposed to last forever.

Hoesekeeping will be performed at scheduled intervals.

Each monitoring system implementation will have their own spcific rules and ways to configure them.

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
