System.Serializable

- Akka redefines System.Serializable as a polyfil for netstandard 1.6
  it doesn't work well with netstandard 2 (it has it's own polyfil),
  I'm forced to make a refrence to Akka package and set the 'alias' property of the refences assembly.

How to do this with NuGet:

https://github.com/NuGet/Home/issues/4989



1- show the basic building block of an application (actors, hierarchy)
   ActorSystem / Actor / Props / IActorRef
   ActorLifecycle
   'persistent state / ephemereal state'

2- introduce ReceiveActor and complex messages (messages better be immutable)

3- show supervision strategies and management (what happens to the actor internal state?)
   what happens to the mailbox

4- routing (load balancing / work distribution) (by hand: entity per child / using routers and routing strategies to distribute the load)

5- remoting/clustering

extensive run
sample 1
- create the actor system
- create some actor that interact (console UI)
- create some messages to exchande data and give instructions
- stop an actor: add commands to stop / kill the actor (what happens to the messages ?)
indepth: how messages are pushed from the inbox to the actor's receive function?
- Dispatchers (https://github.com/petabridge/akka-bootcamp/blob/master/src/Unit-2/lesson1/README.md#dispatcher)
Sample 2
- actors are stateful, how to manage state
- inbox != state
- when to load and save an actor state ?
- introduce akka.persistence ?
sample 3
- supervision hierarchies (reinforce what we said before and show it)
- in case of errors what happens to the current message? 
- in case of errors what happens to the actor state?
- beware of restarts! (it will reuse the original construction arguments: so use factory functions for IDisposable objects:
  https://github.com/petabridge/akka-bootcamp/blob/master/src/Unit-2/lesson3/README.md#functional-programming-for-reliability)
  - during resume current message is lost (need to write code to retry)
  - during resume stash is preserved
  - during resume state is preserved
  - during resume mailbox is preserved
  - during restart current message is lost (need to write code to retry)
  - during restart stash is lost (call unstashall in prerestart to move them in mailbox)
  - during restart internal state is lost (need to be rebuilt in prestart)
  - during restart mailbox is preserved
sample 4
- stash
- how to 'retry' failed message / defer message elaboration
indepth: configuration
- hocon
sample 5
- change behavior (Become, BecomeStacked, UnbecomeStacked)
sample 6
- routing (by hand)
- using some routers (depends on what you do)
sample 7
- remoting 
- clustering

Messaging patterns:
- scheduler (https://github.com/petabridge/akka-bootcamp/blob/master/src/Unit-2/lesson3/README.md#what-is-the-scheduler)
- pub-sub