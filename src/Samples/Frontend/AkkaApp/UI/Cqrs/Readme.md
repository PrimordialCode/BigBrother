The UI generates commands (this can be an ActorSystem)
Commands will be fed to a Command processing layer (It can be another ActorSystem)
Commands will be routed to the specific destination (the message has a way to know to whom it is directed, a message will have some sort of routing informations)
- a command can be directed to a Business Entity
- a command can be directed to a System/Support Entity

In this first implementation we match a CommandHandler with a specific BusinessEntity (Aggregate) / Module

the whole idea is:
- the UI generates the command
- the command get passed to a router (maybe I don't need a router for this scenario)
- the router forward the command to the specified command handler (or ask for its creation if non existing)
- the command is executed by the handler that does whatever it needs to do.

- the instance of the commandhandler will be kept in memory (stateful application) and will be removed when not active anymore
  (the policy can be memory pressure or inactivity)

In a pure DDD approach we can send the commands directly to aggregates avoiding the command handler abstraction
but this can be useful if we also need to deal with external services or we need to interact with other aggregates
before reaching the aggregate itself. The command handler can implement another level of decision logic.
In a pure DDD approach these two entities (the aggregate and it's command handler should be joined toghether), here we use the 
command handler as a way to abstract away some infrastructural requirements and match the message with the already 
existing aggregate method.
The aggregate persistence is your responsibility.

The true approach should have been: you tell your aggregates what to do, the aggregates directly receive your messages, and
internally map the message to the executing function.
The aggregate persistence responsibility goes to the Actor Model Framework.

Custom implementation:
- no need for a router: a parent actor check if a child exists, if not it creates it and then forward the message (see consistenthashrouter).
- second implementation: use a router (consistent hash) and a actor that is a wrapper around the command handler that will manage the commands for that specific aggregate.
                         the problem is: what happens when the managed actor dies


Implementation 1 - CommandHandlerCoordinatorActor
- an actor that coordinates and spawn other actors to perform the job.
- each spawned actor will have a timeout after which the actor will terminate itself (no control / load balancing).

Implementation 2 - CommandHandlerWorker / ConsistenHashRouter
- a command handler worker will internally chose how to handle the message
- a worker will receive all the messages for a specific entity and will process them all