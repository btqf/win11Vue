import useUserStore from '@/store/userStore'
import { handleRename } from '@/utils'
import { getSrcSettingTheme, getSrcSetting } from '@/utils/getSrc'
import '@/styles/mainBodyList.scss'

export default defineComponent({
    props: ['data'],
    setup(props) {
        const data = props.data;
        const store = useUserStore();
        const themeImgData = [
            {
                name: 'default',
            },
            {
                name: 'dark',
            },
            {
                name: 'moon',
            },
            {
                name: 'stream',
            },
            {
                name: 'color',
            },
            {
                name: 'color1',
            },
        ];

        // 主题的切换，切换本地store的图标路径
        const toggleTheme = (e) => {
            const model = e.target.getAttribute('payload');
            store.toggleTheme(model);
        }

        // 修改用户名字
        const rename = () => {
            handleRename();
        };
        
        // 切换模块时的渲染
        const render = () => {
            return (
                <ul className="settingMainBodyList">
                    {
                        data.map((value) => {
                            switch (value.type) {
                                case 'sysTop' :
                                    return (
                                        <div key={value} class={value.type}>
                                            <div class="left">
                                                <img
                                                src={getSrcSettingTheme(`${store.getTheme}.jpg`)}
                                                class="systemThemeImg"
                                                />
                                               <div class="message">
                                                    <p>{store.getUsername}</p>
                                                    <p>NS14A8</p>
                                                    <p onClick={rename}>Rename</p>
                                                </div>
                                            </div>
                                            <div class="right">
                                                <div class="column">
                                                    <div>
                                                    <span>Microsoft 365</span>
                                                    <span class="column_lower">View benefits</span>
                                                    </div>
                                                </div>
                                                <div class="column" onClick={() => setPage('Windows Update')}>
                                                    <img src={getSrcSetting('Windows Update.webp')} alt="" height={20} />
                                                    <div>
                                                    <span>Windows Update</span>
                                                    <span class="column_lower">You're up to date</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                case 'spacer':
                                    return (
                                        <div key={value} class={value.type}>
                                        {value.name}
                                        </div>
                                    );  
                                case 'netTop':
                                    return (
                                        <div key={value} class={value.type}>
                                        <div>
                                            <img src={getSrcSetting('wifi1.png')} />
                                            <div class="message">
                                            <h2>WiFi</h2>
                                            <p>Connected, secured</p>
                                            </div>
                                        </div>
                                        <div>
                                            <img class="warning" src={getSrcSetting('warning.jpg')} />
                                            <div class="message">
                                            <h3>Properties</h3>
                                            <p>Public network 5 Ghz</p>
                                            </div>
                                        </div>
                                        <div>
                                            <img class="warning" src={getSrcSetting('warning.jpg')} />
                                            <div class="message">
                                            <h3>Data Usage</h3>
                                            <p>{Math.round(Math.random() * 100)}GB, last 30 days</p>
                                            </div>
                                        </div>
                                        </div>
                                    );
                                case 'personaliseTop':
                                    return (
                                        <div key={value} class={value.type}>
                                        <div>
                                            <img
                                            class="CurrentImg"
                                            src={getSrcSettingTheme(`${store.$state.themeSrc}.jpg`)}
                                            />
                                        </div>
                                        <div>
                                            <h3>Select a theme to apply</h3>
                                            <div class="themeSelect">
                                            {themeImgData.map((value) => {
                                                return (
                                                <img
                                                    onClick={toggleTheme}
                                                    payload={value.name}
                                                    src={getSrcSettingTheme(`${value.name}.jpg`)}
                                                />
                                                );
                                            })}
                                            </div>
                                        </div>
                                        </div>
                                    );
                                case 'accountsTop':
                                    return (
                                        <div key={value} class={value.type}>
                                        <img src={getSrcSetting('defAccount.png')} />
                                        <div className="message">
                                            <span>{store.getUsername}</span>
                                            <span>Local Account</span>
                                            <span>Administrator</span>
                                        </div>
                                        </div>
                                    );
                                case 'timeTop':
                                    return (
                                        <div key={value} class={value.type}>
                                        <h1>
                                            {new Date().toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: false,
                                            })}
                                        </h1>
                                        </div>
                                    );
                                case 'updateTop':
                                    return (
                                        <div key={value} class={value.type}>
                                        <div>
                                            <img src={getSrcSetting('update.png')} />
                                            <div>
                                            <span>You're up to date</span>
                                            <span>Last checked: Today</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button>Check for updates</button>
                                        </div>
                                        </div>
                                    );
                                default:
                                    return (
                                        <li key={value}>
                                        <div class="descMessage">
                                            <span class="descMessage-name">{value.name}</span>
                                            <span class="descMessage-desc">{value.desc}</span>
                                        </div>
                                        </li>
                                    );
                            }
                        })
                    }
                </ul>
            )
        }
        return render;
    }
})