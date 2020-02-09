#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>
#include "FS.h"

ESP8266WiFiMulti WiFiMulti;
ESP8266WebServer server(80);

void handleRoot() {
  server.send(200, "text/plain", "hello from esp8266!");
}

void setup(void) {
  Serial.begin(115200);
  SPIFFS.begin();
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP("ssid", "password");
  Serial.println("");
  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());
  
  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }
  
  server.on("/", handleRoot);
  server.begin();
  Serial.println("HTTP server started");
}

void loop(void) {
server.handleClient();  
}
