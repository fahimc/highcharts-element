import 'core-js/es/reflect';
import 'core-js/stable/reflect';
import 'core-js/features/reflect';
import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '../../src/index';
import { AppModule } from './app.module';
document.addEventListener('DOMContentLoaded', function(event) {
  platformBrowserDynamic().bootstrapModule(AppModule);
});
