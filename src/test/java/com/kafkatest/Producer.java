package com.kafkatest;

import java.util.Properties;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.KafkaProducer;

public class Producer {

    private static KafkaProducer<String, String> _producer = null;
    
    public static void createProducer(){
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:29092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        _producer = new KafkaProducer<>(props);
    }

    

    public static void produce(String key,String value) {
        
        // Properties props = new Properties();
        // props.put("bootstrap.servers", "localhost:29092");
        // props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        // props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        // KafkaProducer<String, String> producer = new KafkaProducer<>(props);
        ProducerRecord<String, String> record = new ProducerRecord<>("test-topic", key, value);
        _producer.send(record);
        _producer.close();
    }
}
