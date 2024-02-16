package com.v1;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class MyReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        pipmodule.eventEmitter.emit("declineclick",true);
        // TODO: This method is called when the BroadcastReceiver is receiving
        // an Intent broadcast

    }
}