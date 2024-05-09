package com.v1;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;

public class MyReceiver2 extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        Intent serviceIntent = new Intent(context, headless.class);






        if (intent != null && intent.getExtras() != null) {
            // Retrieve extras from the Intent
            String value = intent.getStringExtra("notification");

            if (value != null) {
                Log.d("123244455",value);
                serviceIntent.putExtra("notification", true);
            }
        }else{

                serviceIntent.putExtra("ended", true);

            }
        context.startService(serviceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);

}
}