import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {Layout} from '../../Layout';
import {
  DottedDivider,
  SecondaryHeader,
  SettingSwitchCard,
} from '../../../Components';
import {useAppSettings} from '../../../Contexts/AppSettingContexts';

const AppSettings = () => {
  const {appSettings, updateAppSettings} = useAppSettings();
  console.log(appSettings);
  return (
    <Layout>
      <SecondaryHeader
        title="App Settings"
        isSearch={false}
        isQuestion={false}
        isNotification={false}
      />
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <SettingSwitchCard
          titile="Print on Create Bill"
          subtitle="Automatically print bill when 'Print' button is pressed in create bill"
          isSwitch={appSettings.PRINT_ON_CREATE_BILL}
          onValueChange={async value => {
            await updateAppSettings('PRINT_ON_CREATE_BILL', value);
          }}
        />
        <DottedDivider marginVertical={0} />{' '}
        <SettingSwitchCard
          titile="Send Whatsapp Bill on Create Bill"
          subtitle="Automatically print bill when 'Print' button is pressed in create bill"
          isSwitch={appSettings.SEND_WHATSAPP_BILL_ON_CREATE_BILL}
          onValueChange={async value => {
            await updateAppSettings('SEND_WHATSAPP_BILL_ON_CREATE_BILL', value);
          }}
        />
        <DottedDivider marginVertical={0} />
        <SettingSwitchCard
          titile="Send Whatsapp"
          subtitle="Send Bill to Whatsapp"
          isSwitch={appSettings.SEND_TO_WHATSAPP}
          onValueChange={async value => {
            await updateAppSettings('SEND_TO_WHATSAPP', value);
          }}
        />
        <DottedDivider marginVertical={0} />
      </ScrollView>
    </Layout>
  );
};

export default AppSettings;
