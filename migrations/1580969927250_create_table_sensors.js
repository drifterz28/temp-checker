module.exports = {
    "up": "CREATE TABLE sensors (uuid CHAR(128), phone CHAR(28), lowTemp DECIMAL(5,2), `interval` SMALLINT(2) NOT NULL)",
    "down": "DROP TABLE sensors"
}