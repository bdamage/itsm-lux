import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'aiux-acl|x-kjell-itsm-lux-home-page|read|itsm-dashboard-access': {
                        table: 'sys_security_acl'
                        id: 'c4b2856a097041569598085c937763b8'
                    }
                    'aiux-acl|x-kjell-itsm-lux-incidents-page|read|itsm-incidents-access': {
                        table: 'sys_security_acl'
                        id: 'd8dbac7818f94c098439f5ef72e199bc'
                    }
                    'aiux-color-swatch|itsm-lux-v2': {
                        table: 'sys_aix_color_swatch'
                        id: '3b212e54a464b1beb1f213c3befe312c'
                    }
                    'aiux-experience-page-rel|x-kjell-itsm-lux-home-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: '042f7cd8a554f53c76865aa7ed62e44f'
                    }
                    'aiux-experience-page-rel|x-kjell-itsm-lux-incidents-page': {
                        table: 'sys_aix_experience_page_rel'
                        id: '454dd0172fa393a7320b1955b69c583c'
                    }
                    'aiux-experience-prop|appHeadCss': {
                        table: 'sys_aix_experience_properties'
                        id: '6de2f94abef15135073ee84da82d0dfe'
                    }
                    'aiux-experience-prop|appPlatform': {
                        table: 'sys_aix_experience_properties'
                        id: 'f676b563eb1e5cd6ab55edf4d0c3a899'
                    }
                    'aiux-experience-prop|appTailwindCss': {
                        table: 'sys_aix_experience_properties'
                        id: '8a022a54e2658de08e8b6cc5338dfe78'
                    }
                    'aiux-experience|itsm-lux-v2': {
                        table: 'sys_aix_experience'
                        id: '3ab2b8ca10d3781f0b8ed63be5b1df12'
                    }
                    'aiux-layout-widget|lifecycle': {
                        table: 'sys_aix_widget'
                        id: '201de7aa2dad7bd82848c18c852aef3d'
                    }
                    'aiux-page-widget|x-kjell-itsm-lux-home-page': {
                        table: 'sys_aix_widget'
                        id: '1052768c7b7fef8fe98a7bc610678d0c'
                    }
                    'aiux-page-widget|x-kjell-itsm-lux-incidents-page': {
                        table: 'sys_aix_widget'
                        id: '76feb10a13061273086e7639f18e8a70'
                    }
                    'aiux-page|x-kjell-itsm-lux-home-page': {
                        table: 'sys_aix_page'
                        id: 'aac8467ce8fd251c22e1d94d2eb73576'
                    }
                    'aiux-page|x-kjell-itsm-lux-incidents-page': {
                        table: 'sys_aix_page'
                        id: '97dca9785d2738e6f3e6ea123d985e05'
                    }
                    'aiux-project|x_kjell_itsm_lux': {
                        table: 'sys_aix_project'
                        id: '315a5d5f2a519adb993f2a33e4d84b08'
                    }
                    'aiux-theme|itsm-lux-v2': {
                        table: 'sys_aix_theme'
                        id: '828c11496bb6a5933889fb648a7e0cfa'
                    }
                    'aiux-widget|aiux-hello-world': {
                        table: 'sys_aix_widget'
                        id: '343668e2c37074e012f0d4ec175b4894'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '975cfd68eaaf4c09bcb4268d91733f65'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '546e82648d5541919b2157bfc956f384'
                    }
                }
                composite: [
                    {
                        table: 'sys_security_acl_role'
                        id: '26564fb9bcbf493cb4182d61b2ac1e50'
                        key: {
                            sys_security_acl: 'c4b2856a097041569598085c937763b8'
                            sys_user_role: {
                                id: 'f547e9aa5221496ea4cf4072067f5f29'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '6608f682a46d4c64b19f0def58173235'
                        key: {
                            application_file: '315a5d5f2a519adb993f2a33e4d84b08'
                            source_artifact: '9a66200e412d457dbe1600df18a5c66b'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '9a66200e412d457dbe1600df18a5c66b'
                        key: {
                            name: 'aiux-source 315a5d5f2a519adb993f2a33e4d84b08'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a39516f35938410798a6a4129a36c9ae'
                        key: {
                            sys_security_acl: 'c4b2856a097041569598085c937763b8'
                            sys_user_role: {
                                id: '1f905839e5884b3e85dda486e4b68145'
                                key: {
                                    name: 'itil'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd5b2793faec244c38f8d49362181576a'
                        key: {
                            sys_security_acl: 'd8dbac7818f94c098439f5ef72e199bc'
                            sys_user_role: {
                                id: 'f547e9aa5221496ea4cf4072067f5f29'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e616a76356bb4a3b855b6ec6a64ca752'
                        key: {
                            sys_security_acl: 'd8dbac7818f94c098439f5ef72e199bc'
                            sys_user_role: {
                                id: '1f905839e5884b3e85dda486e4b68145'
                                key: {
                                    name: 'itil'
                                }
                            }
                        }
                    },
                ]
            }
        }
    }
}
