import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable, Subject } from 'rxjs';
pdfMake.vfs = pdfFonts.vfs;

@Injectable({
  providedIn: 'root',
})
export class documentGlobalFuncionService {
  formatoValido$ = new Subject<boolean>();

  constructor(private sanitizer: DomSanitizer) { }

  documentoParaVistaPdfMake(documentoFile: TDocumentDefinitions) {
    return new Promise((resolve) => {
      let documento: SafeResourceUrl;

      pdfMake.createPdf(documentoFile).getBase64((base64: string) => {
        const byteArray = new Uint8Array(
          atob(base64)
            .split('')
            .map((char) => char.charCodeAt(0))
        );
        let file = new Blob([byteArray], { type: 'application/pdf' });
        let fileURL = URL.createObjectURL(file);
        documento = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
        return resolve(documento);
      });
    });
  }

  devuelveDocBase64PdfMake(documento: TDocumentDefinitions) {
    return new Promise((res) => {
      pdfMake.createPdf(documento).getBase64((documentoBase64: string) => {
        return res(documentoBase64);
      });
    });
  }

  devuelveDocBlobPdfMake(documento: TDocumentDefinitions) {
    return new Promise((res, rej) => {
      pdfMake.createPdf(documento).getBlob((documentoBlob: Blob) => {
        return res(documentoBlob);
      });
    });
  }

  devuelveBase64(base64: string) {
    const byteArray = new Uint8Array(
      atob(base64)
        .split('')
        .map((char) => char.charCodeAt(0))
    );
    let file = new Blob([byteArray], { type: 'application/pdf' });
    let fileURL = URL.createObjectURL(file);
    return fileURL;
  }

  changeFileToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  base64ValidaPdf(str: string) {
    const raw = atob(str);
    let result = '';
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      result += hex.length === 2 ? hex : '0' + hex;
    }
    let nValidaPdf = result.substring(0, 8);
    if (nValidaPdf == '25504446') {
      return true;
    } else {
      return false;
    }
  }

  validateFileUpdate(extension: string, file: File): Observable<boolean> {
    let formatoValido = false;
    //Extensiones validas
    const PDF = "pdf";
    const DOC = "doc";
    const DOCX = "docx";
    const XLS = "xls";
    const JPG = "jpg";
    const GIF = "gif";
    const PNG = "png";

    //HEX
    const PDFHEX = "25504446";
    const DOCHEX = "D0CF11E0";
    const DOCXHEX = "504b0304";
    const XLSHEX = "D0CF11E0";
    const JPGHEX = ["FFD8FFE0", "FFD8FFFE"];
    const GIFHEX = ["474946383961", "474946383761"];
    const PNGHEX = "89504E47";

    switch (extension) {
      case PDF:
        this.fileToBase64(file).then((base64Hex: string) => {
          if (this.base64ToHex(base64Hex).startsWith(PDFHEX)) {
            this.formatoValido$.next(true);
          } else {
            formatoValido = false;
            this.formatoValido$.next(false);
          }
        });
        break;
      default:
        formatoValido = false;
        this.formatoValido$.next(false);
        break;
    }
    return this.formatoValido$.asObservable();
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64_string = String(reader.result).split(",")[1]
        resolve(base64_string)
      }
      reader.onerror = error => reject(error);
    });
  }

  base64ToHex(base64: string) {
    let result = '';
    const raw = atob(base64);
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      result += (hex.length === 2 ? hex : '0' + hex);
    }
    return result;
  }
}
