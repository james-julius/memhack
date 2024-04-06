import { ResponsiveRadar } from "@nivo/radar"

const data = [
    {
        "taste": "fruity",
        "chardonay": 109,
        "carmenere": 26,
        "syrah": 26
    },
    {
        "taste": "bitter",
        "chardonay": 89,
        "carmenere": 74,
        "syrah": 64
    },
    {
        "taste": "heavy",
        "chardonay": 86,
        "carmenere": 54,
        "syrah": 77
    },
    {
        "taste": "strong",
        "chardonay": 72,
        "carmenere": 66,
        "syrah": 21
    },
    {
        "taste": "sunny",
        "chardonay": 66,
        "carmenere": 32,
        "syrah": 54
    }
];

const MyResponsiveRadar = ({ data /* see data tab */ }) => (
    <ResponsiveRadar
        data={data}
        keys={[ 'chardonay', 'carmenere', 'syrah' ]}
        indexBy="taste"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'nivo' }}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
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

export default function MemoryDisplay() {
    <div className="w-1/3 h-full flex">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Memories
        </h4>
        <div>

</div>
        </div>
}