// package com.kafkatest;

// import java.io.File;
// import java.io.IOException;
// import java.util.Properties;
// import org.apache.avro.Schema;
// import org.apache.avro.generic.GenericData;
// import org.apache.avro.generic.GenericRecord;
// import org.apache.avro.generic.GenericDatumReader;
// import org.apache.avro.file.DataFileReader;
// import org.apache.avro.file.DataFileWriter;
// import org.apache.avro.io.DatumReader;
// import org.apache.avro.io.DatumWriter;
// import org.apache.avro.specific.SpecificDatumReader;
// import org.apache.avro.specific.SpecificDatumWriter;
// import org.apache.kafka.clients.producer.ProducerRecord;
// import org.apache.kafka.clients.producer.KafkaProducer;
// import io.confluent.kafka.serializers.KafkaAvroSerializer;

// public class AvroProducer {

//     private static KafkaProducer<String, GenericRecord> producer = null;
//     private static final String SCHEMA_FILE_PATH = "/python/esquema.avsc";

//     public static void createProducer(){
//         Properties props = new Properties();
//         props.put("bootstrap.servers", "localhost:29092");
//         props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
//         props.put("value.serializer", KafkaAvroSerializer.class.getName());
//         props.put("schema.registry.url", "http://localhost:8081"); // Cambiar la URL del registro de esquemas según corresponda

//         producer = new KafkaProducer<>(props);
//     }

//     public static void produce(String key, String value) {
//         GenericRecord avroRecord = new GenericData.Record(getSchema());
//         avroRecord.put("key", key);
//         avroRecord.put("value", value);

//         ProducerRecord<String, GenericRecord> record = new ProducerRecord<>("avro-topic", key, avroRecord);
//         producer.send(record);
//         producer.close();
//     }

//     private static Schema getSchema() {
//         try {
//             File schemaFile = new File(SCHEMA_FILE_PATH);
//             Schema.Parser parser = new Schema.Parser();
//             return parser.parse(schemaFile);
//         } catch (IOException e) {
//             e.printStackTrace();
//             // Manejar la excepción si es necesario.
//         }
//         return null;
//     }
// }
