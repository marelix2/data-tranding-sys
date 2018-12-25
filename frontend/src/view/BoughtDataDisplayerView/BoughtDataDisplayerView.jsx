
import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import TsTable from './../../components/TsTable/TsTable';

class BoughtDataDisplayerView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            header: [
                {
                    name: 'Kolumna 1',
                    width: '4'
                },
                {
                    name: 'Miasta',
                    width: '4'
                },
                {
                    name: 'Co tam',
                    width: '3'
                },
                {
                    name: 'Super dluga nazwa',
                    width: '6'
                },
                {
                    name: 'col1',
                    width: '3'
                }
            ],
            data: [
                [
                    {
                        value: 'Kolumna 1',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Cos',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 2',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Cos',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 3',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Cos',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 4',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Cos',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 5',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Cos',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 6',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Cos',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 7',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Cos',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 8',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Cos',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 9',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Cos',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 10',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Cos',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }

                ],
                [
                    {
                        value: 'Kolumna 11',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Cos',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 12',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Cos',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 13',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'eoeoeo',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ],
                [
                    {
                        value: 'Kolumna 14',
                        width: '4',
                    },
                    {
                        value: 'ukryta wartosc',
                        width: '4',
                        isHidden: true
                    },
                    {
                        value: 'Miasta',
                        width: '4'
                    },
                    {
                        value: 'Co tam',
                        width: '3'
                    },
                    {
                        value: 'Super dluga nazwa',
                        width: '6'
                    },
                    {
                        value: 'col1',
                        width: '3'
                    }
                ]
            ]
        }
    }

    render() {
        return (
            <>
                <TsTitle
                    title='Bought Data Displayer View'
                    image={{ name: 'boughtData', type: 'png' }} />

                <TsTable
                    header={this.state.header}
                    rows={this.state.data} />
            </>
        );
    }
}

export default BoughtDataDisplayerView;



