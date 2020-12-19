import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {login_with_vk} from "../../actions/AuthAction";
import i18n from "../../I18n";

const VK_CLIENT_ID = process.env.REACT_APP_VK_ID;
const VK_SCOPE = 4194304;

const connector = connect(
  () => ({}),
  { login_with_vk },
);
type TLoginProps = ConnectedProps<typeof connector>;

const VkAuth: React.FC<TLoginProps> = ({login_with_vk}) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    useEffect(() => {
        // @ts-ignore
        if (!document.getElementById('vk-sdk')) {
          setIsLoaded(true);
        }
        asyncInit();
        loadSdkAsync();
    }, []);


    const asyncInit = () => {
        // @ts-ignore
        window.vkAsyncInit = () => {
            // @ts-ignore
            window.VK.init({ apiId: VK_CLIENT_ID });
            setIsLoaded(true);
        };
    }

    const loadSdkAsync = () => {
        const el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = 'https://vk.com/js/api/openapi.js?';
        el.async = true;
        el.id = 'vk-sdk';
        document.getElementsByTagName('head')[0].appendChild(el);
    }

    const checkLoginState = (response: any) => {
      setIsProcessing(false)
      login_with_vk(response)
    };

    const handleClick = () => {
        if (!isLoaded || isProcessing) {
            return;
        }
        setIsProcessing(true)
        // @ts-ignore
        window.VK.Auth.login(checkLoginState, VK_SCOPE);
    };

    return (
      <span>
          <button className="btn btn-primary mt-3 w-100" onClick={handleClick}>
              <i className='fa fa-vk px-2' />
              {i18n.t('auth.login_vk')}
          </button>
      </span>
    );
}

export default connector(VkAuth);