import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenProfile'
})
export class ImagenProfilePipe implements PipeTransform {

  transform(imagePath): string {
    if (!imagePath) {
      return 'assets/img/icons/no-image-profile.png';
    } else {
      return imagePath;
    }
  }

}
