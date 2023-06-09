@ignore
Feature: 1234

@produceMessage
Scenario: Produce Message
    * def Producer = Java.type('com.kafkatest.Producer')
	* def producer = Producer.createProducer()
	# * def Consumer = Java.type('com.kafkatest.Consumer')
    # * def consumer = new Consumer('test-topic')

    * def mensaje = producer('message', mensaje)


@consumeMessage
Scenario: Consume Message
    
	* def Consumer = Java.type('com.kafkatest.Consumer')
    * def consumer = new Consumer('test-topic')
    * def message = consumer.consume()

@produceMessageAvro
Scenario: Produce Message
    * def Producer = Java.type('com.kafkatest.AvroProducer')
	* def producer = Producer.createProducer()
	# * def Consumer = Java.type('com.kafkatest.Consumer')
    # * def consumer = new Consumer('test-topic')

    * def mensaje = producer('message', mensaje)


@consumeMessageAvro
Scenario: Consume Message
    
	* def Consumer = Java.type('com.kafkatest.AvroConsumer')
    * def consumer = new Consumer('avro-topic')
    * def message = consumer.consume()



