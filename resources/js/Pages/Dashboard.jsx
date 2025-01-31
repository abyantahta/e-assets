import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
// import Chart from react-ReactApexChart
import Chart from 'react-apexcharts';
export default function Dashboard({
    numberOfItems,
    numberOfActiveItems,
    numberOfDeactiveItems,
    itemsByCategories,
    totalNBVAssets,
    queryParams = null
}) {
    //PIE CHART OPTIONS 
    // let numOfItemsOptions = {
    //     series: [numberOfActiveItems,numberOfDeactiveItems],
    //     labels: ['Active', 'Deactive'],
    // }
    let itemsByCategoriesOptions = {
        series : itemsByCategories.data,
        labels : itemsByCategories.label
    }

























    // console.log('kesini')
    // let options = {
    //     chart: {
    //         id: "basic-bar"
    //     },
    //     xaxis: {
    //         // categories: ["1991,1992,1993,1994,1995,1996,1997,1998,1999"]
    //         type: 'category'
    //     }
    // }
    // let series = [{
    //     name: "series-1",
    //     data: [{x: "Apple",y: 34},{x: "Banana",y: 54},{x: "Kiwae",y: 23},{x: "Imaja",y: 87},{x: "Pokiya",y: 81}]
    // }]
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
            queryParams["page"] = 1;
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

            <div className="py-12">
                <div className="mx-auto max-w-[100rem] sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex gap-8">
                                <SelectInput
                                            className="w-72 border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme"
                                            defaultValue={
                                                queryParams.category_id
                                            }
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
                                            <option value="4">
                                                Office Equipment
                                            </option> 
                                            <option value="5">Machine</option>
                                            {/* <option value="6">Office Equipment</option> */}
                                </SelectInput>
                                <SelectInput
                                            className="w-72 border-gray-700 border-[3px] italic font-semibold focus:none ring:none text-greenTheme"
                                            defaultValue={
                                                queryParams.category_id
                                            }
                                            onChange={(e) =>
                                                searchFieldChanged(
                                                    "category_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">All Year</option>
                                            <option value="2025">2025</option>
                                            <option value="2024">2024</option>
                                            <option value="2023">2023</option>
                                            <option value="2022">
                                                2022
                                            </option> 
                                            <option value="2021">2021</option>
                                            {/* <option value="6">Office Equipment</option> */}
                                </SelectInput>
                            </div>
                            <div className="bg-red-300 mt-6">
                                <h1>hdaslkdhas</h1>
                            </div>
                            {/* You're logged in! */}
                            <h1>{numberOfItems}</h1>
                            <h2>{numberOfActiveItems}</h2>
                            <h2>{numberOfDeactiveItems}</h2>
                            <h2>{totalNBVAssets}</h2>
                            <Chart
                                options={itemsByCategoriesOptions}
                                series={itemsByCategoriesOptions.series}
                                labels = {itemsByCategoriesOptions.labels}
                                type='donut'
                                width="500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
