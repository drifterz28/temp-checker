module.exports = {
    "up": "CREATE TABLE temps (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, uuid CHAR(128), temp DECIMAL(5,2), battery INT, timeDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    "down": "DROP TABLE temps"
}
