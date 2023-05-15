package com.kafkatest;
import java.util.*;
import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.common.*;
import org.apache.kafka.common.serialization.*;

public class Consumer {
    private final KafkaConsumer<String, String> consumer;
    private final String topic;

    public Consumer(String topicName) {
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:29092");
        props.put("group.id", "test-group");
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "1000");
        props.put("key.deserializer", StringDeserializer.class.getName());
        props.put("value.deserializer", StringDeserializer.class.getName());
        this.consumer = new KafkaConsumer<>(props);
        //this.topic = "test-topic";
        this.topic = topicName;
    }

    public String consume() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            // Manejar la excepción si es necesario.
        }

        consumer.subscribe(Arrays.asList(this.topic));
        String message = null;
        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(100);
            if (records.count() > 0) {
                for (ConsumerRecord<String, String> record : records) {
                    message = record.value();
                }
                break; // read only the last message
            }
            
        }
        consumer.close();
        return message;
    }

    // private final static String TOPIC_NAME = "test-topic";
    // private final static String BOOTSTRAP_SERVERS = "localhost:29092";
    // private final static String GROUP_ID = "test-group";
    // private final static int MAX_POLL_RECORDS = 1;

    // private final KafkaConsumer<String, String> consumer;
    // private final String topic;

    // public Consumer() {
    //     Properties props = new Properties();
    //     props.put("bootstrap.servers", "localhost:29092");
    //     props.put("group.id", "test-group");
    //     props.put("enable.auto.commit", "true");
    //     props.put("auto.commit.interval.ms", "1000");
    //     props.put("key.deserializer", StringDeserializer.class.getName());
    //     props.put("value.deserializer", StringDeserializer.class.getName());
    //     // props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, MAX_POLL_RECORDS);
    //     this.consumer = new KafkaConsumer<>(props);
    //     this.topic = "test-topic";
    // }

    // public String consume() {
    //     consumer.subscribe(Arrays.asList(this.topic));
    //     String message = null;
    //     while (true) {
    //         ConsumerRecords<String, String> records = consumer.poll(100);
    //         if (records.count() > 0) {
    //             for (ConsumerRecord<String, String> record : records) {
    //                 message = record.value();
    //             }
    //             break; // read only the last message
    //         }
    //     }
    //     consumer.close();
    //     return message;
    // }

    // public static String consume() {

    //     final String mensaje = new String();

    //     // Configurar propiedades del consumer
    //     Properties props = new Properties();
    //     props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
    //     props.put(ConsumerConfig.GROUP_ID_CONFIG, GROUP_ID);
    //     props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
    //     props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
    //     props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, MAX_POLL_RECORDS);
    //     props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

    //     // Crear instancia del consumer
    //     KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);

    //     // Subscribirse al topic
    //     consumer.subscribe(Collections.singletonList(TOPIC_NAME));

    //     // Iniciar ciclo de consumo de mensajes
    //     // while (true) {
    //         ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    //         records.forEach(record -> {
    //             mensaje = record.value();
    //             System.out.println("Mensaje recibido: " + record.value());
    //         });
    //         consumer.commitSync();
    //     // }
        
    //     return mensaje;
    // }
}
