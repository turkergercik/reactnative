package com.v1;

import android.app.Activity;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class pause extends ReactContextBaseJavaModule {
    private ReactContext mReactContext;
    pause(ReactApplicationContext context) {
        super(context);
        mReactContext = context;
    }

    // add to CalendarModule.java
    @Override
    public String getName() {
        return "pause";
    }

    @ReactMethod
    public void pause() {
        Activity activity = mReactContext.getCurrentActivity();
        activity.moveTaskToBack(true);
    }

}