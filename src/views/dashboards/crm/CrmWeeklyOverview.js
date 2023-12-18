import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from 'src/@core/components/icon';
import CustomAvatar from 'src/@core/components/mui/avatar';
import { useTheme } from '@mui/material/styles'
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba';

const CrmWeeklyOverview = ({ data }) => {
    const theme = useTheme();
    const [last13MonthsData, setLast13MonthsData] = useState([]);

    useEffect(() => {
        setLast13MonthsData(data);
    }, []);

    const options = {
        chart: {
            offsetY: -9,
            offsetX: -16,
            parentHeightOffset: 0,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: '35%',
                endingShape: 'rounded',
                startingShape: 'rounded',
                colors: {
                    ranges: [
                        {
                            to: 50,
                            from: 40,
                            color: hexToRGBA(theme.palette.primary.main, 1),
                        },

                    ],
                },
            },
        },
        markers: {
            size: 3.5,
            strokeWidth: 2,
            fillOpacity: 1,
            strokeOpacity: 1,
            colors: [theme.palette.background.paper, theme.palette.error.main],
            strokeColors: hexToRGBA(theme.palette.primary.main, 1),
        },
        stroke: {
            width: [0, 2],
            colors: [theme.palette.customColors.trackBg, theme.palette.error.main],
        },
        legend: { show: false },
        dataLabels: { enabled: false },
        colors: [hexToRGBA(theme.palette.customColors.trackBg, 1)],
        grid: {
            strokeDashArray: 7,
            borderColor: theme.palette.divider,
        },
        states: {
            hover: {
                filter: { type: 'none' },
            },
            active: {
                filter: { type: 'none' },
            },
        },
        xaxis: {
            categories: last13MonthsData?.map((item) => item.month), // Substitua 'month' pelo campo real em seus dados
            tickPlacement: 'on',
            labels: { show: true },
            axisTicks: { show: false },
            axisBorder: { show: false },
        },
        yaxis: {
            min: 0,
            // max: 20,
            show: true,
            tickAmount: 4,
            labels: {
                formatter: (value) => (value > 999 ? `${(value / 1000).toFixed(0)}` : value),
                style: {
                    fontSize: '0.75rem',
                    colors: theme.palette.text.disabled,
                },
            },
        },
    };

    const updatedSeries = [
        {
            name: 'MP',
            type: 'column',
            data: last13MonthsData?.map((item) => item.mp),
            // data: last13MonthsData.map((item) => ({
            //     x: item.month,
            //     y: item.mp,
            //     fillColor: {
            //         colors: [
            //             {
            //                 opacity: 1,
            //             },
            //             {
            //                 opacity: 0.5,
            //             },
            //         ],
            //     },



            // })),

        },
        {
            name: 'Não Conformidade',
            type: 'line',
            data: last13MonthsData?.map((item) => item.nc),
            color: theme.palette.error.main,
        },
    ];

    return (
        <Card>
            <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
                <div className='flex items-center gap-4'>
                    <CustomAvatar skin='light' variant='rounded' color='primary'>
                        <Icon icon='icon-park-outline:receive' className='text-base text-[#35553B]' />
                    </CustomAvatar>
                    <Typography sx={{ mr: 4 }} variant='body1'>
                        Recebimento MP e Não Conformidade
                    </Typography>
                </div>
                <ReactApexcharts type='line' height={208} series={updatedSeries} options={options} />
            </CardContent>
        </Card>
    );
};

export default CrmWeeklyOverview;
