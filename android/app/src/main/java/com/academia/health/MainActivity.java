package com.academia.health;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;


public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(PedometerPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
