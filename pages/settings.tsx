import React, {
  useState,
  useCallback
} from 'react';
import {
  Page,
  Layout,
  Card,
  Form,
  FormLayout,
  TextField,
  Button,
  Stack,
  SettingToggle,
  TextStyle,
} from '@shopify/polaris';

const Settings: React.FC = () => {


  const [discount, setDiscount] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const handleSubmit = useCallback(() => {

  }, [])



  return (
    <Page>
      <Layout>
        <Layout.AnnotatedSection
          title="Default discount"
          description="Add a product to Sample App, it will automatically be discounted."
        >
          <Card sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={discount.toString()}
                  onChange={v => setDiscount(parseInt(v, 10))}
                  label="Discount percentage"
                  step={1}
                  min={0}
                  type="number"
                />
                <Stack distribution="trailing">
                  <Button
                    primary
                    submit
                  >
                    Save
                  </Button>
                </Stack>
              </FormLayout>
            </Form>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Price updates"
          description="Temporarily disable all Sample App price updates"
        >
          <SettingToggle
            action={{
              content: enabled ? 'Disable' : 'Enable',
              onAction: () => setEnabled(!enabled),
            }}
            enabled={enabled}
          >
            This setting is{' '}
            <TextStyle variation="strong">{enabled ? 'Disabled' : 'Enabled'}</TextStyle>.
          </SettingToggle>
        </Layout.AnnotatedSection>

      </Layout>
    </Page>
  );
}

export default Settings
