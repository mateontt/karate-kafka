
package com.inditex.finc.hosieser.karate;

import com.intuit.karate.http.HttpLogModifier;

/**
 * @author carlosmanms
 */
public class CustomHttpLogModifier implements HttpLogModifier {

    public static final HttpLogModifier INSTANCE = new CustomHttpLogModifier();

    // For performance reasons, you can implement enableForUri() so that this "activates" only for some
    // URL patterns.
    @Override
    public boolean enableForUri(String uri) {
        return true;
    }

    @Override
    public String uri(String uri) {
        return uri;
    }

    @Override
    public String header(String header, String value) {
        if (header.toLowerCase().contains("authorization")) {
            return "***";
        }
        if (header.toLowerCase().contains("cookie")) {
            return "***";
        }
        if (header.toLowerCase().contains("xss-protection")) {
            return "***";
        }
        return value;
    }

    @Override
    public String request(String uri, String request) {
        return request;
    }

    @Override
    public String response(String uri, String response) {
        return response;
    }

}
