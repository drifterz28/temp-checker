# temp-checker
Keeps track of temps and notifies when threshold is hit

- update .env file

## TODO

- setup esp for deep sleep with time options
  - formula is minutes * 6e+7
  - options will be for 15, 30, 60 minutes
- setup enpoint to send data as sms with last data

## ESP settings

  - phone number to send to
  - high and low alert settings
  - how often to report temp
  - api key for user
  - wifi ssid and password

## Server setup

  - check phone number and add permissions (api key)
  - DB to store temp and battery.
  - send text with temp and battery data
  - if battery is low send text with charge me notice
  - if temp is low or high send notice with battery level