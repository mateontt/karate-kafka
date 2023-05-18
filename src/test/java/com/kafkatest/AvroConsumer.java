// package com.kafkatest;
// import java.util.*;
// import org.apache.kafka.clients.consumer.*;
// import org.apache.kafka.common.*;
// import org.apache.kafka.common.serialization.*;
// import org.apache.avro.generic.GenericRecord;
// import io.confluent.kafka.serializers.KafkaAvroDeserializer;

// public class AvroConsumer {
//     private final KafkaConsumer<String, GenericRecord> consumer;
//     private final String topic;

//     public AvroConsumer(String topicName) {
//         Properties props = new Properties();
//         props.put("bootstrap.servers", "localhost:29092");
//         props.put("group.id", "avro-topic");
//         props.put("enable.auto.commit", "true");
//         props.put("auto.commit.interval.ms", "1000");
//         props.put("key.deserializer", StringDeserializer.class.getName());
//         props.put("value.deserializer", KafkaAvroDeserializer.class.getName());
//         props.put("schema.registry.url", "http://localhost:8081"); // Cambiar la URL del registro de esquemas según corresponda
//         this.consumer = new KafkaConsumer<>(props);
//         this.topic = topicName;
//     }

//     public GenericRecord consume() {
//         try {
//             Thread.sleep(1000);
//         } catch (InterruptedException e) {
//             // Manejar la excepción si es necesario.
//         }

//         consumer.subscribe(Arrays.asList(this.topic));
//         GenericRecord message = null;
//         while (true) {
//             ConsumerRecords<String, GenericRecord> records = consumer.poll(100);
//             if (records.count() > 0) {
//                 for (ConsumerRecord<String, GenericRecord> record : records) {
//                     message = record.value();
//                 }
//                 break; // leer solo el último mensaje
//             }
//         }
//         consumer.close();
//         return message;
//     }
// }
