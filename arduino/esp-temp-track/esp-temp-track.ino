#include "ConfigManager.h"
#include <math.h>

const char *settingsHTML = (char *)"/settings.html";
const char *mainJS = (char *)"/index.js";

struct Config {
  char phone[10];
  char key[64];
  float temp;
  float timing;
} config;

struct Metadata {
  int8_t version;
} meta;

ConfigManager configManager;

void APCallback(WebServer *server) {
    DebugPrintln(F("AP Mode Enabled. You can call other functions that should run after a mode is enabled ... "));
}


void APICallback(WebServer *server) {
  server->on("/disconnect", HTTPMethod::HTTP_GET, [server](){
    configManager.clearWifiSettings(false);
  });

  server->on("/setup.html", HTTPMethod::HTTP_GET, [server](){
    configManager.streamFile(settingsHTML, mimeHTML);
  });

  server->on("/index.js", HTTPMethod::HTTP_GET, [server](){
    configManager.streamFile(mainJS, mimeJS);
  });

}

void setup() {
  DEBUG_MODE = true;
  Serial.begin(115200);
  DebugPrintln(F(""));

  meta.version = 3;

  // Setup config manager
  configManager.setAPName("Demo");
  configManager.setAPFilename("/setup.html");

  // Settings variables
  configManager.addParameter("phone", config.phone, 10);
  configManager.addParameter("key", config.key, 64);
  configManager.addParameter("temp", &config.temp);
  configManager.addParameter("timing", &config.timing);

  // Meta Settings
  configManager.addParameter("version", &meta.version, get);

  // Init Callbacks
  configManager.setAPCallback(APCallback);
  configManager.setAPICallback(APICallback);

  configManager.begin(config);
}

void loop() {
  DebugPrintln(F("test"));
  configManager.loop();
}