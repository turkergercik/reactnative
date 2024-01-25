package com.v1;

import static androidx.core.content.ContextCompat.startActivity;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.KeyguardManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;
import android.text.TextUtils;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
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
        //activity.finish();




        //activity.moveTaskToBack(true);
        activity.finishAffinity();
    }
    @ReactMethod
    public void disNotCh() {
        Intent intent = new Intent(Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS);
        intent.putExtra(Settings.EXTRA_APP_PACKAGE, mReactContext.getPackageName());
        intent.putExtra(Settings.EXTRA_CHANNEL_ID, "3");
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        mReactContext.startActivity(intent);


       /* boolean c= isNotificationChannelEnabled(mReactContext,"3");
        if(c){

        }*/
    }
    @ReactMethod
    public void isNotificationChannelEnabled(@Nullable String channelId, Promise promise){

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            if(!TextUtils.isEmpty(channelId)) {
                NotificationManager manager = (NotificationManager) mReactContext.getSystemService(Context.NOTIFICATION_SERVICE);
                NotificationChannel channel = manager.getNotificationChannel(channelId);
                promise.resolve( channel.getImportance() != NotificationManager.IMPORTANCE_NONE);
            }
            promise.resolve(false);
        } else {

            promise.resolve(NotificationManagerCompat.from(mReactContext).areNotificationsEnabled());

        }
    }
    @ReactMethod
    public void changedcm(String dcm) {

        WindowManager.LayoutParams lp =getCurrentActivity().getWindow().getAttributes();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            if(dcm.equals("shortEdges")){
                lp.layoutInDisplayCutoutMode= WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;

            }else if(dcm.equals("default")){
                lp.layoutInDisplayCutoutMode= WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT;

            }
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    getCurrentActivity().getWindow().getDecorView().requestLayout();

                }
            });

        }



    }
    @ReactMethod
    public void play() {
        /*<item name="android:windowDisablePreview">true</item>
        <item name="android:colorBackground">#ff00ff</item>
        */
        Intent intent = new Intent(mReactContext, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK|Intent.FLAG_ACTIVITY_SINGLE_TOP);
       mReactContext.startActivity(intent);
    }
    @ReactMethod
    public void islocked(Promise promise) {
        KeyguardManager myKM = (KeyguardManager) mReactContext.getSystemService(Context.KEYGUARD_SERVICE);
        if( myKM.inKeyguardRestrictedInputMode()) {
            promise.resolve(true);
        } else {
            promise.resolve(false);
        }
    }
    @ReactMethod
    public void overapprequest(Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(mReactContext)) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + mReactContext.getPackageName()));
                getCurrentActivity().startActivityForResult(intent, 0);
                promise.resolve(false);
            }else{
                promise.resolve(true);
            }
        }

    }
    @ReactMethod
    public void addbackgrouncall() {
            Window w =  new MainActivity().getWindow();
            w.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON|
                    WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD|
                    WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED|
                    WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);



    }
    @ReactMethod
    public void removebackgrouncall() {
        Window w = mReactContext.getCurrentActivity().getWindow();
        w.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON|
                WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD|
                WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED|
                WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);

    }

}