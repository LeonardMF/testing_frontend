import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpeakService, ListenService } from 'speech-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  language: string;
  asr: string;
  tts: string;
  voice: string;
  voiceList: string[];

  constructor( private speakService: SpeakService,
               private listenService: ListenService,
               private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.language = 'de';
    this.setLanguage();
    this.asr = this.listenService.asr;
    this.tts = this.speakService.tts;
    this.voice = this.speakService.voice;
    this.voiceList = this.speakService.getVoiceList();
  }

  getVoice(): void {
    this.voice = '';
    this.voiceList = this.speakService.getVoiceList();
    this.ref.detectChanges();
  }

  setLanguage(): void {
    this.speakService.language = this.language;
    console.log('Set Language to ' + this.language + '.');
    this.getVoice();
  }

  setASR(): void {
    this.listenService.asr = this.asr;
    console.log('Set ASR to ' + this.asr + '.');
  }

  setTTS(): void {
    this.speakService.tts = this.tts;
    console.log('Set TTS to ' + this.tts + '.');
    this.getVoice();
  }

  setVoice(): void {
    this.speakService.voice = this.voice;
    console.log('Set Voice to ' + this.voice + '.');
  }

}
