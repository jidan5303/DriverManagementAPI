const express = require('express');
const sql = require('mssql/msnodesqlv8');
const app = express();
const port = 8080;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const config = {
    connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-BUKCHJ3\\SQLEXPRESS01;Database=DriverManagement;UID=sa;PWD=53032014;Trusted_Connection=yes;Encrypt=no;"
};

const db = sql.connect(config, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})

app.get('/api/getAllDriverInfo', async function (req, res) {
    var request = db.request();

    const result = await request.query('select * from DriverInfo where Status=1');
    res.json({ message: "Collected data from DB", lstDriverInfo: result.recordsets });
});

app.post('/api/saveDriverInfo', async function (req, res) {

    var request = db.request();

    request.input('DriverName', sql.NVarChar, req.body.DriverName);
    request.input('DOB', sql.DateTime, req.body.DOB);
    request.input('Experience', sql.NVarChar, req.body.Experience);
    request.input('HaveLicence', sql.Bit, req.body.HaveLicence);
    request.input('ExpectedSalary', sql.Int, req.body.ExpectedSalary);
    request.input('WrittenTestPassed', sql.Bit, req.body.WrittenTestPassed);
    request.input('OralTestPassed', sql.Bit, req.body.OralTestPassed);
    request.input('DrivingTestPassed', sql.Bit, req.body.DrivingTestPassed);

    const result = await request.query('INSERT INTO DriverInfo(DriverName, DOB, Experience, HaveLicence, ExpectedSalary, WrittenTestPassed, OralTestPassed, DrivingTestPassed, Status) values(@DriverName, @DOB, @Experience, @HaveLicence, @ExpectedSalary, @WrittenTestPassed, @OralTestPassed, @DrivingTestPassed, 1)');
    res.json({ message: "Data saved successfully", statusCode: 200 });
});

app.post('/api/editDriverInfo', async function (req, res) {

    var request = db.request();

    request.input('DriverID', sql.Int, req.body.DriverID);
    request.input('DriverName', sql.NVarChar, req.body.DriverName);
    request.input('DOB', sql.DateTime, req.body.DOB);
    request.input('Experience', sql.NVarChar, req.body.Experience);
    request.input('HaveLicence', sql.Bit, req.body.HaveLicence);
    request.input('ExpectedSalary', sql.Int, req.body.ExpectedSalary);
    request.input('WrittenTestPassed', sql.Bit, req.body.WrittenTestPassed);
    request.input('OralTestPassed', sql.Bit, req.body.OralTestPassed);
    request.input('DrivingTestPassed', sql.Bit, req.body.DrivingTestPassed);

    const result = await request.query('UPDATE DriverInfo SET DriverName=@DriverName, DOB=@DOB, Experience=@Experience, HaveLicence=@HaveLicence, ExpectedSalary=@ExpectedSalary, WrittenTestPassed=@WrittenTestPassed, OralTestPassed=@OralTestPassed, DrivingTestPassed=@DrivingTestPassed where DriverID=@DriverID');
    res.json({ message: "Data updated successfully", statusCode: 200 });
});

app.post('/api/deleteDriverInfo', async function (req, res) {

    var request = db.request();

    request.input('DriverID', sql.Int, req.body.DriverID);

    const result = await request.query('UPDATE DriverInfo SET Status=9 where DriverID=@DriverID');
    res.json({ message: "Data deleted successfully", statusCode: 200 });
});
