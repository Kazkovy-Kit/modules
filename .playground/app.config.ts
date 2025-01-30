export default defineAppConfig({
    modules: [
        {
            id: 'test',
            icon: 'lucide:table-cells-split',
            items: [
                {
                    id: 'test-item',
                    to: {
                        name: 'test.item',
                    },
                },
                {
                    id: 'test-item-two',
                    to: {
                        name: 'test.item.two',
                    },
                }
            ]
        }
    ]
})
