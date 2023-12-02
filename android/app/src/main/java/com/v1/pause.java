package com.v1;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;

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
        activity.finishAffinity();
    }
    @ReactMethod
    public void  setP(String orientation) {
        Activity activity = mReactContext.getCurrentActivity();
        if(orientation.equals("p")){
            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }else{
            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        }


    }
    @ReactMethod
    public void play() {
        Intent intent = new Intent(mReactContext, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK|Intent.FLAG_ACTIVITY_SINGLE_TOP);
        mReactContext.startActivity(intent);
    }

}