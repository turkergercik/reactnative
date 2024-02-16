package com.v1;

import android.app.Activity;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Build;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.ReactContext;


public class CustomVideocall extends ReactActivity {
    public static Activity activity = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
        activity= this;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            Window w = getWindow(); // in Activity's onCreate() for instance
            w.setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        }


    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, "customvc") {
            @Nullable
            @Override
            protected Bundle getLaunchOptions() {

                Bundle bundle = getIntent().getExtras();
                return bundle;
            }
        };
    }
    @Override
    public void onPause() {
        super.onPause();
        //pipmodule.eventEmitter.emit("appstate",false);
    }
    @Override
    public void onResume() {
        super.onResume();
        //pipmodule.eventEmitter.emit("appstate",true);
    }
    @Override
    public void onBackPressed() {

        //super.onBackPressed();
        //activity.finish();

        pipmodule.eventEmitter.emit("backpress",true);
    }
    static boolean active = false;

    @Override
    public void onStart() {
        super.onStart();
        active = true;
        pipmodule.eventEmitter.emit("appstate",true);
    }

    @Override
    public void onStop() {
        super.onStop();
        active = false;
        pipmodule.eventEmitter.emit("appstate",false);
    }
    @Override
    public void onUserLeaveHint () {
        pipmodule.eventEmitter.emit("onhint",true);
    }
    @Override
    public void onPictureInPictureModeChanged (boolean isInPictureInPictureMode, Configuration newConfig) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            super.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig);
            pipmodule.pipModeChanged(isInPictureInPictureMode);

        }

    }
    public static void stopvc1(){
      activity.finish();
    }
    @Override
    protected String getMainComponentName() {
        return "customvc";
    }


}