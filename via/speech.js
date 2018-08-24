const fs = require('fs');
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient({
    keyFilename: '../googlekey.json'
});

// The text to synthesize
exports.TexttoSpeech = async(text) => {
  
  return await new Promise(async(resolve,reject) => {
    const request = {
      input: {text: text},
      // Select the language and SSML Voice Gender (optional)
      voice: {languageCode: 'pt_BR', ssmlGender: 'BASIC'},
      // Select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'},
    };
    
    // Performs the Text-to-Speech request
    client.synthesizeSpeech(request, (err, response) => {
      if (err) {
        console.error('ERROR:', err);
        reject(err);
      }
    
      // Write the binary audio content to a local file
      fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
        if (err) {
          console.error('ERROR:', err);
          reject(err);
        }
        resolve(true);
        console.log('Audio content written to file: output.mp3');
      });
    });
  })
//  console.log(text);  
//const text = txt.toString();

// Construct the request

}