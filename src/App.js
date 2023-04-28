import React, { useState, useEffect } from "react";
import fetchMetadata from "./metadataService";

const App = ({ id }) => {
  const [metadata, setMetadata] = useState("");
  const [ques, setQues] = useState("");
  const [userInputs, setUserInputs] = useState([]);

  var questions = ([] = []);
  var attr = [];

  useEffect(() => {
    const getMetadata = async () => {
      const data = await fetchMetadata(id);
      attr = data;
      setMetadata(attr);
    };
    getMetadata();
  }, [id]);
  if (!metadata) {
    return <div>Loading metadata...</div>;
  }
  const names = ([] = []);
  for (let i = 1; i < metadata.attributes.metadata.attributes.length; i++) {
    questions.push(metadata.attributes.metadata.attributes[i].question);
    names.push(metadata.attributes.metadata.attributes[i].name);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // creating database7
    var MongoClient = require("mongodb").MongoClient;
    var url = "mongodb://localhost:27017/Modeldata";

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      db.close();
    });

    // creating collection
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("ModelData");
      dbo.createCollection("Data", function (err, res) {
        if (err) throw err;
        db.close();
      });
    });

    // inserting data into database
      try {
        MongoClient.connect(url, function (err, db) {
          if (err) throw err;
          var myDatabase = db.db("ModelData");
          myDatabase.collection("Data").insertOne(ques, function (err, res) {
            if (err) throw err;
            db.close();
          });
        });
      } catch (e) {
        alert(e);
      }
    
    window.location.reload();
  }
  return (
    <div className="App">
      <header className="">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-4 mt-3">
                <label htmlFor="ModelName">Model Name:</label>
              </div>
              <div className="col-8 mt-3">
                <input
                  type="text"
                  id="ModelName"
                  value={metadata.attributes.name}
                />
              </div>
            </div>
            <div className="row">
              {questions.map((question, i) => (
                <>
                  <div className="col-4 mt-3">
                    <label htmlFor="Question">{question}</label>
                  </div>
                  <div className="col-8 mt-3">
                    <input
                      type="text"
                      id="Question"
                      onChange={(e) => {
                        setQues(e.target.value);
                      }}
                      onBlur={() => {
                        userInputs.push({
                          ques: ques,
                        });
                      }}
                    />
                  </div>
                </>
              ))}
            </div>
            <button type="submit">Save Data</button>
          </form>
        </div>
      </header>
    </div>
  );
};
export default App;
