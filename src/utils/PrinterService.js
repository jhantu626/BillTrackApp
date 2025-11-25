import BLEPrinter from 'react-native-bluetooth-classic';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {print} from '@gorhom/bottom-sheet/lib/typescript/utilities/logger';
import {formatDate, formatTime12Hour} from './helper';
import {Invoice} from '../Screens';

class PrinterService {
  async requestPermission() {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 31) {
        const permissions = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        return (
          permissions['android.permission.BLUETOOTH_CONNECT'] === 'granted'
        );
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  }

  async detectDevices() {
    try {
      const granted = await this.requestPermission();
      if (!granted) {
        Alert.alert('Permission Denied');
        return null;
      }
      const isBluetoothEnabled = await BLEPrinter.isBluetoothEnabled();
      if (!isBluetoothEnabled) {
        Alert.alert('Please enable Bluetooth');
        return null;
      }
      const bondedPrinters = await BLEPrinter.getBondedDevices();
      return bondedPrinters;
    } catch (error) {
      return null;
    }
  }

  async printInvoice(
    printer,
    invoice,
    invoiceItems,
    gstList,
    totalQuantity,
    subTotalAmount,
    business,
  ) {
    try {
      console.log('printer', invoice);
      const granted = await this.requestPermission();
      if (!granted) {
        Alert.alert('Permission Denied');
        return null;
      }
      const address = printer?.address;
      const connection = await BLEPrinter.connectToDevice(address);
      if (!connection) {
        Alert.alert('Printer not connected');
        return null;
      }
      await connection.connect();
      console.log(business);
      const ESC = '\x1B';
      const GS = '\x1D';
      const INIT = ESC + '@';
      const ALIGN_CENTER = ESC + 'a' + '1';
      const ALIGN_LEFT = ESC + 'a' + '0';
      const ALIGN_RIGHT = ESC + 'a' + '2';
      const BOLD_ON = ESC + 'E' + '1';
      const BOLD_OFF = ESC + 'E' + '0';
      const SIZE_NORMAL = GS + '!' + '\x00';
      const SIZE_LARGE = GS + '!' + '\x11';
      const SIZE_MEDIUM = GS + '!' + '\x00';
      const SIZE_INBETWEEN = GS + '!' + '\x01';
      const CUT_PAPER = GS + 'V' + '1';
      const LINE_FEED = '\n';
      const LINE_SPACING_NORMAL = '\x1B\x32'; // ESC 2
      const DOTTED_LINE = '--------------------------------';

      let printData = INIT;

      // Header - Business Info (Centered)
      printData += ALIGN_CENTER;
      printData += SIZE_INBETWEEN + BOLD_ON;
      printData += LINE_SPACING_NORMAL;
      printData += `${business?.name}${LINE_FEED}`;
      printData += SIZE_NORMAL + BOLD_OFF;

      if (business?.phone) {
        printData += `Phone: ${business.phone}${LINE_FEED}`;
      }

      printData += `${business?.street || ''}${LINE_FEED}`;
      printData += `${business?.city || ''}, ${
        business?.state || ''
      }${LINE_FEED}`;
      printData += `${business?.pinCode || ''}${LINE_FEED}`;

      if (business?.gstNumber) {
        printData += `GST NO: ${business.gstNumber}${LINE_FEED}`;
      }

      printData += DOTTED_LINE + LINE_FEED;

      // Invoice Details
      printData += ALIGN_LEFT;
      printData += `Invoice No: ${invoice.invoiceNumber}${LINE_FEED}`;
      printData += `Date: ${formatDate(invoice.createdAt)}${LINE_FEED}`;
      printData += `Time: ${formatTime12Hour(invoice.createdAt)}${LINE_FEED}`;

      if (invoice.customerNumber) {
        printData += `Customer: +91 ${invoice.customerNumber}${LINE_FEED}`;
      }

      printData += DOTTED_LINE + LINE_FEED;

      // Items Header
      printData += BOLD_ON;
      printData += this.formatLine('Item', 'Qty', 'Rate', 'Amount');
      printData += BOLD_OFF;
      printData += DOTTED_LINE + LINE_FEED;

      // Items
      invoiceItems.forEach(item => {
        const itemName = this.truncateString(item.productName || item.name, 12);
        const quantity = item.quantity.toString();
        const rate = parseFloat(item.rate).toFixed(2);
        const amount = (
          parseFloat(item.rate) * parseInt(item.quantity)
        ).toFixed(2);

        printData += this.formatLine(itemName, quantity, rate, amount);
      });

      printData += DOTTED_LINE + LINE_FEED;

      // Totals
      printData += this.formatTotalLine('Total Qty:', totalQuantity.toString());
      printData += this.formatTotalLine(
        'Sub Total:',
        `RS ${subTotalAmount.toFixed(2)}`,
      );

      printData += DOTTED_LINE + LINE_FEED;

      // GST Details
      if (gstList && gstList.length > 0) {
        gstList.forEach(gst => {
          const gstLabel = `${gst.gstType} @ ${gst.gstPercentage}%`;
          const gstAmount = `RS ${gst.gstAmount.toFixed(2)}`;
          printData += this.formatTotalLine(gstLabel, gstAmount);
        });
        printData += DOTTED_LINE + LINE_FEED;
      }

      // Payment and Total
      printData += this.formatTotalLine('Payment:', invoice?.paymentMode.toUpperCase());
      printData += BOLD_ON + SIZE_MEDIUM;
      printData += this.formatTotalLine(
        'Total Amount:',
        `RS ${invoice.totalAmount}`,
      );
      printData += SIZE_NORMAL + BOLD_OFF;

      printData += DOTTED_LINE + LINE_FEED;

      // Footer
      printData += ALIGN_CENTER + BOLD_ON;
      printData += `Thank You & Visit Again${LINE_FEED}`;
      printData += BOLD_OFF;

      // Cut paper
      printData += CUT_PAPER;
      console.log('printData', printData);
      // Send to printer
      await connection.write(printData);
      await connection.disconnect();
    } catch (error) {
      console.log(error);
    }
  }

  formatLine(col1, col2, col3, col4) {
    const c1 = this.padRight(col1, 12);
    const c2 = this.padLeft(col2, 4);
    const c3 = this.padLeft(col3, 6);
    const c4 = this.padLeft(col4, 8);
    return `${c1}${c2} ${c3} ${c4}\n`;
  }

  // Helper function to format total lines (Label: Value)
  formatTotalLine(label, value) {
    const totalWidth = 32;
    const valueWidth = 12;
    const labelWidth = totalWidth - valueWidth;
    const l = this.padRight(label, labelWidth);
    const v = this.padLeft(value, valueWidth);
    return `${l}${v}\n`;
  }

  // Helper function to pad right
  padRight(str, length) {
    str = str.toString();
    while (str.length < length) {
      str += ' ';
    }
    return str.substring(0, length);
  }

  // Helper function to pad left
  padLeft(str, length) {
    str = str.toString();
    while (str.length < length) {
      str = ' ' + str;
    }
    return str.substring(0, length);
  }

  // Helper function to truncate string
  truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 2) + '..';
    }
    return str;
  }
}

const printerService = new PrinterService();

export default printerService;
