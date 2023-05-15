from kafka import KafkaProducer

producer = KafkaProducer(bootstrap_servers=['localhost:29092'])
topic = 'test-topic'
key = 'test-key'
value = 'test-value'
producer.send(topic, key=key.encode(), value=value.encode())
producer.flush()
