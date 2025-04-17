import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { ShieldExclamationIcon } from "@heroicons/react/16/solid";
import Chart from "react-apexcharts";
export default function Dashboard({
    years,
    numberOfItems,
    numberOfActiveItems,
    numberOfDeactiveItems,
    itemsByCategories,
    totalNBVAssets,
    queryParams = null,
    penambahan_aset_monthly,
    disposal_aset_monthly,
    months_label,
    cost_per_categories,
    nbv_cost_category,
    depreciation,
    depreciation_per_month,
    depreciationByMonths,
    sto_progress,
}) {
    let itemsByCategoriesOptions = {
        series: itemsByCategories.data,
        labels: itemsByCategories.label,
        legend: {
            position: "bottom",
            offsetX: 0,
            offsetY: 0,
            width: "100px",
        },
    };
    let costPerCategoriesOptions = {
        series: cost_per_categories.data,
        labels: cost_per_categories.label,
    };
    let serviceDateByMonth = {
        options: {
            chart: {
                id: "basic-bar",
            },
            xaxis: {
                categories: months_label,
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "M";
                },
            },
        },
        series: [
            {
                name: "Penambahan Aset",
                data: penambahan_aset_monthly,
            },
        ],
    };
    let disposalDateByMonth = {
        options: {
            chart: {
                id: "basic-bar",
            },
            xaxis: {
                categories: months_label,
            },
            dataLabels: {
                enabled: true,
                style: {
                },
                background: {
                    enabled: true,
                    foreColor: "#444",
                    borderRadius: 3,
                    padding: 4,
                    opacity: 0.5,
                    borderWidth: 2,
                    borderColor: "#fff",
                },
                formatter: function (val) {
                    return val + " JT";
                },

            },
        },
        series: [
            {
                name: "Disposal Aset",
                data: disposal_aset_monthly,
            },
        ],
    };
    let depreciationByMonthOptions = {
        options: {
            chart: {
                id: "basic-bar",
            },
            xaxis: {
                categories: depreciationByMonths.label,
            },
            dataLabels: {
                enabled: true,
                style: {
                },
                background: {
                    enabled: true,
                    foreColor: "#444",
                    borderRadius: 3,
                    padding: 4,
                    opacity: 0.5,
                    borderWidth: 2,
                    borderColor: "#fff",
                },
                formatter: function (val) {
                    return val + "M";
                },

            },
        },
        series: [
            {
                name: "Depresiasi Aset",
                data: depreciationByMonths.data,
            },
        ],
    };
    let nbv_cost_category_options = {
        series: nbv_cost_category,
        chart: {
            type: "bar",
            stacked: true,
            stackType: "100%",
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: "bottom",
                        offsetX: -10,
                        offsetY: 0,
                    },
                },
            },
        ],
        xaxis: {
            categories: ["COST", "NBV"],
            labels: {
                show: true,
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
                showDuplicates: false,
                trim: false,
                minHeight: undefined,
                maxHeight: 120,
                style: {
                    colors: [],
                    fontSize: "13px",
                    fontWeight: "bold",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    cssClass: "apexcharts-xaxis-label",
                },
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: "bottom",
            offsetX: 0,
            offsetY: 0,
        },
    };
    let sto_progress_options = {
        series: [sto_progress],
        options: {
            chart: {
                height: 350,
                type: "radialBar",
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 225,
                    hollow: {
                        margin: 0,
                        size: "65%",
                        background: "#fff",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0.5,
                        },
                    },
                    track: {
                        background: "#fff",
                        strokeWidth: "57%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                            enabled: true,
                            top: -3,
                            left: 0,
                            blur: 4,
                            opacity: 0.7,
                        },
                    },

                    dataLabels: {
                        show: true,
                        name: {
                            offsetY: -12,
                            show: true,
                            color: "#666",
                            fontSize: "14px",
                        },
                        value: {
                            formatter: function (val) {
                                return parseInt(val);
                            },
                            offsetY: 8,
                            color: "#444",
                            fontSize: "40px",
                            fontWeight: "bold",
                            show: true,
                        },
                    },
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "horizontal",
                    shadeIntensity: 0.5,
                    gradientToColors: ["#ABE5A1"],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                },
            },
            stroke: {
                lineCap: "round",
            },
            labels: ["STO (%)"],
        },
    };
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
            // queryParams["page"] = 1;
        } else {
            delete queryParams[name];
        }
        router.get(route("dashboard"), queryParams);
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="mx-auto max-w-[100rem] sm:px-6 lg:px-8">
                    <div className="shadow-sm sm:rounded-lg ">
                        <div className="p-6 text-gray-900">
                            {/* <div className="bg-yellow-400 flex items-center justify-center gap-4 mb-4">
                                <ShieldExclamationIcon
                                    className={"h-12 text-red-500 "}
                                />
                                <h1 className=" font-bold text-4xl text-[#444] text-center">
                                    UNDER DEVELOPMENT
                                </h1>
                                <ShieldExclamationIcon
                                    className={"h-12 text-red-500 "}
                                />
                            </div> */}
                            <div className="flex md:flex-row flex-col gap-y-3 gap-x-8 ">
                                <SelectInput
                                    className="md:w-72 border-gray-700 w-full border-[3px] italic font-semibold focus:none ring:none text-greenTheme"
                                    defaultValue={queryParams.category_id}
                                    name="category_id"
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "category_id",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">All</option>
                                    <option value="1">Tooling</option>
                                    <option value="2">Building</option>
                                    <option value="3">Vehicle</option>
                                    <option value="4">Office Equipment</option>
                                    <option value="5">Machine</option>
                                    {/* <option value="6">Office Equipment</option> */}
                                </SelectInput>
                                <SelectInput
                                    className="w-full md:w-72 border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme"
                                    defaultValue={queryParams.years}
                                    name="years"
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "years",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">All Year</option>
                                    {
                                        years.map(year=>(
                                            <option key={year} value={year}>{year}</option>
                                        ))
                                    }
                                </SelectInput>
                            </div>
                            <div className="w-full gap-4 flex md:flex-row flex-col mt-6">
                                <div className="flex flex-col gap-4  min-w-80 justify-between ">
                                    <div className="w-full flex flex-col bg-greenTheme text-white text-center h-32 rounded-xl justify-center">
                                        <h2 className="tracking-wider text-2xl">
                                            JUMLAH ASSET
                                        </h2>
                                        <h3 className="font-semibold text-6xl">
                                            {Intl.NumberFormat("en-DE").format(
                                                numberOfItems
                                            )}
                                        </h3>
                                    </div>
                                    <div className="flex flex-col gap-2 h-56 w-full">
                                        <div className="h-[50%] gap-2 flex flex-col">
                                            <h2 className="bg-green-100 h-1/2 flex items-center justify-center font-bold text-xl rounded-t-lg text-green-800">
                                                Active : {numberOfActiveItems}
                                            </h2>
                                            <h2 className="bg-red-100 h-1/2 flex items-center justify-center font-bold text-xl text-red-700">
                                                Deactive :{" "}
                                                {numberOfDeactiveItems}
                                            </h2>
                                        </div>
                                        <Chart
                                            options={
                                                sto_progress_options.options
                                            }
                                            series={sto_progress_options.series}
                                            type="radialBar"
                                            className="bg-indigo-50 rounded-b-lg "
                                            height={"70%"}
                                        />
                                    </div>
                                    <div className="rounded-md py-3 shadow-md bg-green-200 w-full px-4">
                                        <h4 className="font-semibold text-center text-xl uppercase mb-2 text-brownTheme">
                                            Jenis aset aktif
                                        </h4>
                                        <Chart
                                            options={itemsByCategoriesOptions}
                                            series={
                                                itemsByCategoriesOptions.series
                                            }
                                            labels={
                                                itemsByCategoriesOptions.labels
                                            }
                                            type="pie"
                                            height="200"
                                        />
                                    </div>
                                </div>
                                <div className="w-full shrink flex box-border h-full flex-col gap-3 ">
                                    <div className="bg-pink-100 rounded-md pt-3 shadow-md grow h-1/3">
                                        <h4 className="font-semibold text-center text-xl uppercase mb-2 text-brownTheme">
                                            DEPRESIASI ASET
                                        </h4>
                                        <Chart
                                            options={
                                                depreciationByMonthOptions.options
                                            }
                                            series={depreciationByMonthOptions.series}
                                            type="bar"
                                            height="88%"
                                        />
                                    </div>
                                    <div className="bg-red-100 rounded-lg pt-2 shadow-md grow h-1/3 pb-4 ">
                                        <h4 className="font-semibold text-center text-xl uppercase mb-2 text-brownTheme">
                                            PENAMBAHAN ASET
                                        </h4>
                                        <Chart
                                            options={serviceDateByMonth.options}
                                            series={serviceDateByMonth.series}
                                            type="bar"
                                            height="88%"
                                        />
                                    </div>
                                    <div className="bg-pink-100 rounded-md pt-3 shadow-md grow h-1/3 ">
                                        <h4 className="font-semibold text-center text-xl uppercase mb-2 text-brownTheme">
                                            DISPOSAL ASET
                                        </h4>
                                        <Chart
                                            options={
                                                disposalDateByMonth.options
                                            }
                                            series={disposalDateByMonth.series}
                                            type="bar"
                                            height="88%"
                                        />
                                    </div>
                                </div>
                                {/* <div className="w-full flex gap-8 bg-blue-400">
                                    <div className="w-72 py-6 bg-greenTheme rounded-lg flex items-center justify-center gap-2 flex-col text-lightTheme">
                                        <h2 className="tracking-wider text-2xl">
                                            JUMLAH ASSET
                                        </h2>
                                        <h3 className="font-semibold text-6xl">
                                            {Intl.NumberFormat("en-DE").format(
                                                numberOfItems
                                            )}
                                        </h3>
                                    </div>
                                    <div className="w-72 grow py-6 bg-[#E19922] text-lightTheme rounded-lg flex items-center justify-center gap-2 flex-col ">
                                        <h2 className="font-semibold tracking-wider text-2xl">
                                            TOTAL DEPRESIASI
                                        </h2>
                                        <h3 className="font-semibold text-5xl">
                                        Rp.
                                                {Intl.NumberFormat(
                                                    "en-DE"
                                                ).format(
                                                    depreciation / 1000000000
                                                )}
                                                M
                                            
                                        </h3>
                                    </div>
                                    <div className="w-72 py-6 bg-greenTheme rounded-lg flex items-center justify-center gap-2 flex-col text-lightTheme">
                                        <h2 className="tracking-wider text-2xl">
                                            DEPRESIASI/BULAN
                                        </h2>
                                        <h3 className="font-semibold text-5xl">
                                            {Intl.NumberFormat("en-DE").format(
                                                Math.floor(depreciation_per_month)/1000000000
                                            )} M
                                        </h3>
                                    </div>
                                    <div className="w-72 grow bg-transparent rounded-lg flex items-center justify-center gap-2 flex-col text-lightTheme">
                                        <div className="w-full py-3 rounded-lg bg-[#E19922] text-center flex-col gap-2 flex">
                                            <h2 className="tracking-wider text-2xl">
                                                TOTAL NBV
                                            </h2>
                                            <h3 className="font-semibold text-5xl">
                                                Rp.
                                                {Intl.NumberFormat(
                                                    "en-DE"
                                                ).format(
                                                    totalNBVAssets / 1000000000
                                                )}{" "}
                                                M
                                            </h3>
                                        </div>
                                        <div className="bg-[#E19922] rounded-lg w-full grow"></div>
                                    </div>
                                </div>
                                <div className=" flex mt-4 gap-2 w-full bg-orange-600">
                                    <div className="w-5/6 ">
                                        <div className="flex gap-2 h-72">
                                            <div className="flex flex-col gap-2 w-72">
                                                <div className="h-[30%] gap-2 flex flex-col">
                                                    <h2 className="bg-green-100 h-1/2 flex items-center justify-center font-bold text-xl rounded-t-lg text-green-800">
                                                        Active :{" "}
                                                        {numberOfActiveItems}
                                                    </h2>
                                                    <h2 className="bg-red-100 h-1/2 flex items-center justify-center font-bold text-xl text-red-700">
                                                        Deactive :{" "}
                                                        {numberOfDeactiveItems}
                                                    </h2>
                                                </div>
                                                <Chart
                                                    options={
                                                        sto_progress_options.options
                                                    }
                                                    series={
                                                        sto_progress_options.series
                                                    }
                                                    type="radialBar"
                                                    className="bg-indigo-50 rounded-b-lg "
                                                    height={"70%"}
                                                />
                                            </div>
                                            <div className="bg-red-100 rounded-lg pt-2 shadow-md grow h-full ">
                                                <h4 className="font-semibold text-center text-xl uppercase mb-2 text-brownTheme">
                                                    PENAMBAHAN ASET
                                                </h4>
                                                <Chart
                                                    options={
                                                        serviceDateByMonth.options
                                                    }
                                                    series={
                                                        serviceDateByMonth.series
                                                    }
                                                    type="bar"
                                                    height="88%"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 h-72 mt-3">
                                        <div className="rounded-md py-3 shadow-md bg-green-100 w-fit px-4">
                                                <h4 className="font-semibold text-center text-xl uppercase mb-2 text-brownTheme">
                                                    Presentase jenis aset aktif
                                                </h4>
                                                <Chart
                                                    options={
                                                        itemsByCategoriesOptions
                                                    }
                                                    series={
                                                        itemsByCategoriesOptions.series
                                                    }
                                                    labels={
                                                        itemsByCategoriesOptions.labels
                                                    }
                                                    type="pie"
                                                    height="240"
                                                />
                                            </div>  
                                            <div className="bg-pink-100 rounded-md pt-3 shadow-md grow h-full ">
                                                <h4 className="font-semibold text-center text-xl uppercase mb-2 text-brownTheme">
                                                    DISPOSAL ASET
                                                </h4>
                                                <Chart
                                                    options={
                                                        disposalDateByMonth.options
                                                    }
                                                    series={
                                                        disposalDateByMonth.series
                                                    }
                                                    type="bar"
                                                    height="88%"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="bg-yellow-50 rounded-md shadow-md w-1/6 flex flex-col">
                                        <h4 className="font-semibold text-center text-xl mt-3 uppercase mb-2 text-brownTheme h-[13%]">
                                            NBV & COST <br /> PER KATEGORI
                                        </h4>
                                        <Chart
                                            options={nbv_cost_category_options}
                                            series={
                                                nbv_cost_category_options.series
                                            }
                                            className="grow"
                                            type="bar"
                                            height={"87%"}
                                        />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
