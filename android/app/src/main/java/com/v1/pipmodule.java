package com.v1;

import android.app.PendingIntent;
import android.app.PictureInPictureParams;
import android.app.RemoteAction;
import android.content.Intent;
import android.graphics.drawable.Icon;
import android.net.Uri;
import android.os.Build;
import android.util.Log;
import android.util.Rational;
import android.widget.ImageView;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class pipmodule extends ReactContextBaseJavaModule {

    public static final String PIP_MODE_CHANGE = "PIP_MODE_CHANGE";
    public static DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;

    ReactApplicationContext reactApplicationContext;

    public static void pipModeChanged(Boolean isInPictureInPictureMode) {
        eventEmitter.emit(PIP_MODE_CHANGE, isInPictureInPictureMode);
    }

    public pipmodule(ReactApplicationContext reactContext) {
        super(reactContext);
        Log.d("PIP", "Got the context");
        this.reactApplicationContext = reactContext;
    }

    @Override
    @NonNull
    public String getName() {
        return "pipmodule";
    }

    @Override
    public void initialize() {
        super.initialize();

        eventEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }
    @ReactMethod
    public void exitpip(int width, int height) {


    }
    @ReactMethod
    public void addListener(String eventName) {

    }
    @ReactMethod
    public void removeListeners(Integer count) {

    }
    @ReactMethod
    public void enterPipMode(int width, int height) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int ratWidth = width > 0 ? width : 380;
            int ratHeight = height > 0 ? height : 214;
            Icon icon;
            icon = Icon.createWithResource(reactApplicationContext,R.drawable.decline);

            RemoteAction remoteAction = null;
            Intent intent = new Intent(reactApplicationContext,MyReceiver.class);
            PendingIntent broadcast = PendingIntent.getBroadcast(reactApplicationContext, 0,
                    intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
            remoteAction = new RemoteAction(icon, "", "", broadcast);
            Rational ratio
                    = new Rational(ratWidth, ratHeight);
            PictureInPictureParams.Builder
                    pip_Builder
                    = null;

            pip_Builder = new PictureInPictureParams
                    .Builder();
            List<RemoteAction> actions = new ArrayList<>();
            actions.add(remoteAction);
            pip_Builder
                    .setAspectRatio(ratio)
                    .setActions(actions)
                    .build();
            reactApplicationContext.getCurrentActivity().enterPictureInPictureMode(pip_Builder.build());
        }
    }
}
