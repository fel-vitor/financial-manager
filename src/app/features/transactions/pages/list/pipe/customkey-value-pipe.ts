import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customkeyValue',
  pure: false,
})
export class CustomkeyValuePipe implements PipeTransform {
  transform(obj: Record<string, unknown>): { key: string; value: unknown }[] {
    console.log(obj);
    return Object.keys(obj).map((key) => {
      return {
        key,
        value: obj[key],
      };
    });
  }
}
