import angular from 'angular';
import NotepadComponent from './notepad.controller';

export default angular
  .module('msgQueApp.notepad', [])
  .component('notepad', NotepadComponent)
  .name;
