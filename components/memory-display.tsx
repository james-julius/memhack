'use client'
import { ResponsiveRadar } from '@nivo/radar'
import { useEffect, useMemo } from 'react'

type EmotionKeys = 'Fear' | 'Anger' | 'Sadness' | 'Surprise' | 'Joy' | 'Love'

interface EmotionSet {
  Fear: number
  Anger: number
  Sadness: number
  Surprise: number
  Joy: number
  Love: number
}

interface Memory {
  event: string
  date: string
  emotions: EmotionSet
}

const memories: Memory[] = [
  {
    event: 'Dudley’s Birthday at the Zoo',
    date: '1991-06-23',
    emotions: {
      Fear: 3,
      Anger: 4,
      Sadness: 5,
      Surprise: 7,
      Joy: 2,
      Love: 1
    }
  },
  {
    event: 'Meeting Rubeus Hagrid and Learning He’s a Wizard',
    date: '1991-07-31',
    emotions: {
      Fear: 4,
      Anger: 1,
      Sadness: 2,
      Surprise: 10,
      Joy: 9,
      Love: 3
    }
  },
  {
    event: 'Meeting Ron Weasley',
    date: '1991-09-01',
    emotions: {
      Fear: 2,
      Anger: 1,
      Sadness: 1,
      Surprise: 3,
      Joy: 8,
      Love: 6
    }
  },
  {
    event: 'Meeting Hermione Granger',
    date: '1991-09-01',
    emotions: {
      Fear: 1,
      Anger: 2,
      Sadness: 1,
      Surprise: 4,
      Joy: 5,
      Love: 3
    }
  },
  {
    event:
      "Winning the Triwizard Tournament and Witnessing Cedric Diggory's Death",
    date: '1995-06-24',
    emotions: {
      Fear: 10,
      Anger: 8,
      Sadness: 10,
      Surprise: 7,
      Joy: 1,
      Love: 2
    }
  },
  {
    event: 'Death of Sirius Black',
    date: '1996-06-18',
    emotions: {
      Fear: 8,
      Anger: 7,
      Sadness: 10,
      Surprise: 5,
      Joy: 0,
      Love: 6
    }
  },
  {
    event: 'Being Sorted into Gryffindor House',
    date: '1991-09-01',
    emotions: {
      Fear: 4,
      Anger: 1,
      Sadness: 2,
      Surprise: 6,
      Joy: 7,
      Love: 3
    }
  },
  {
    event: 'Winning the House Cup in His First Year',
    date: '1992-06-07',
    emotions: {
      Fear: 2,
      Anger: 1,
      Sadness: 1,
      Surprise: 5,
      Joy: 10,
      Love: 4
    }
  },
  {
    event: 'First Time Playing Quidditch',
    date: '1991-11-07',
    emotions: {
      Fear: 6,
      Anger: 2,
      Sadness: 1,
      Surprise: 7,
      Joy: 8,
      Love: 3
    }
  },
  {
    event: 'First Kiss with Ginny Weasley',
    date: '1997-05-02',
    emotions: {
      Fear: 1,
      Anger: 1,
      Sadness: 1,
      Surprise: 5,
      Joy: 9,
      Love: 10
    }
  }
]

const emotions: EmotionKeys[] = [
  'Fear',
  'Anger',
  'Sadness',
  'Surprise',
  'Joy',
  'Love'
]

const MyResponsiveRadar = ({ data }: { data: EmotionSet[] }) => {
  const structure = useMemo(() => {
    const entries = []
    for (const emotion of emotions) {
      // Get the emotion values for each memory event
      const result: { [key: string]: string | number } = {
        emotion
      }
      // Process the values out of the memory history
      // @ts-ignore
      data.forEach((memory: Memory) => {
        result[memory.event] = memory[emotion]
      })
      debugger
      entries.push(result)
    }
    return entries
  }, [data])

  useEffect(() => {
    console.log({ structure })
  }, [structure])
  return (
    <ResponsiveRadar
      data={structure}
      margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
      keys={memories.map((entry: Memory) => entry.event)}
      indexBy="emotion"
      borderColor={{ from: 'color' }}
      gridLabelOffset={16}
      dotSize={5}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={2}
      colors={{
        scheme: 'spectral'
      }}
      blendMode="multiply"
      motionConfig="wobbly"
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          translateX: 0,
          translateY: 0,
          itemWidth: 20,
          itemHeight: 20,
          itemTextColor: '#444',
          symbolSize: 12,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  )
}

export default function MemoryDisplay() {
  return (
    <div className="w-1/2 h-full flex flex-col">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Memories
      </h4>
      <div className="size-full px-4">
        <MyResponsiveRadar
          data={memories.map((entry: Memory) => ({
            ...entry.emotions,
            event: entry.event
          }))}
        />
      </div>
    </div>
  )
}
