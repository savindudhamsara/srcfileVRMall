import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudioServiceService {

  blobUrl: any;
  recording = false;
  interval: any; recordingTimer!: any; recordWebRTC: any; mediaRecordStream: any;
  options: any = {
    type: 'audio',
    mimeType: 'audio/webm'
  }

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  toggleRecord() {
    if (this.recordingTimer) {
      var URLs = this.stopRTC();
      this.recording = false;
      console.log("URL is", URLs);
      
      return URLs;
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        this.startRTC(stream);
        this.recording = true;
      }).catch(error => {
        alert(error)
      })
    }
  }

  startRTC(stream: any) {
    this.recordWebRTC = new RecordRTC.StereoAudioRecorder(stream, this.options);
    this.mediaRecordStream = stream;
    this.blobUrl = null;
    this.recordWebRTC.record();
    this.startCountdown();
  }

  stopRTC(): any {
    return new Promise((resolve, reject) => {
      this.recordWebRTC.stop((blob: Blob | MediaSource) => {
        this.blobUrl = URL.createObjectURL(blob);
        this.startCountdown(true);
        resolve(this.blobUrl);
      });
    })
  }

  startCountdown(clearTime = false) {
    if (clearTime) {
      this.clearStream(this.mediaRecordStream);
      this.recordWebRTC = null;
      this.recordingTimer = null;
      this.mediaRecordStream = null;
      clearInterval(this.interval);
      return
    } else {
      this.recordingTimer = `00:00`;
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      let timer: any = this.recordingTimer;
      timer = timer.split(':');
      let minutes = +timer[0];
      let seconds = +timer[1];

      if (minutes == 10) {
        this.recordWebRTC.stopRecording();
        clearInterval(this.interval);
        return
      }
      ++seconds;
      if (seconds >= 59) {
        ++minutes;
        seconds = 0;
      }

      if (seconds < 10) {
        this.recordingTimer = `0${minutes}:0${seconds}`;
      } else {
        this.recordingTimer = `0${minutes}:${seconds}`;
      }
    }, 1000);
  }

  clearStream(stream: any) {
    try {
      stream.getAudioTracks().forEach((track: any) => track.stop());
      stream.getVideoTracks().forEach((track: any) => track.stop());
    } catch (error) {
      //stream error
    }
  }
}
