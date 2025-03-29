"use client";
import { Button, NumberInput, Text, Paper, Grid, Group, Space } from '@mantine/core';

export default function LeftMenu({ media, updateMediaProps, handlePlay }) {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      updateMediaProps({
        url,
        type: selectedFile.type.startsWith('video') ? 'video' : 'image',
        width: 300,
        height: 200,
        x: 50,
        y: 50,
        startTime: 0,
        endTime: 10,
      });
    }
  };

  return (
    <Paper shadow="sm" padding="md" withBorder style={{ width: '100%', height: '100%' }}>
      <Group position="center">
        <Button
          component="label"
          variant="outline"
          fullWidth
          style={{ marginBottom: 16, height: 50, fontSize: 16 }}
        >
          Choose a file
          <input 
            type="file" 
            accept="video/*,image/*" 
            onChange={handleFileChange} 
            hidden
          />
        </Button>
      </Group>
      <Grid gutter="sm">
        <Grid.Col span={6}>
          <NumberInput 
            label="Width" 
            value={media?.width || ''}
            onChange={(value) => updateMediaProps({ width: value })}
            styles={{ input: { textAlign: 'center' } }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput 
            label="Height" 
            value={media?.height || ''}
            onChange={(value) => updateMediaProps({ height: value })}
            styles={{ input: { textAlign: 'center' } }}
          />
        </Grid.Col>
      </Grid>
      <Space h="md" />
      <Grid gutter="sm">
        <Grid.Col span={6}>
          <NumberInput 
            label="Start Time (sec)" 
            value={media?.startTime || ''}
            onChange={(value) => updateMediaProps({ startTime: value })}
            styles={{ input: { textAlign: 'center' } }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput 
            label="End Time (sec)" 
            value={media?.endTime || ''}
            onChange={(value) => updateMediaProps({ endTime: value })}
            styles={{ input: { textAlign: 'center' } }}
          />
        </Grid.Col>
      </Grid>
      <Space h="md" />
      <Button onClick={handlePlay} fullWidth style={{ height: 50, fontSize: 16 }}>
        Play
      </Button>
    </Paper>
  );
}
