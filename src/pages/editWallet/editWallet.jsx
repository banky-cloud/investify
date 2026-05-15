import { useEffect, useState } from "react";
import "./editDepositWallets.css";
import toast from "react-hot-toast";
import Loader from "../../components/spinner";
import { apiEntry } from "../register/register";

export default function EditDepositWallets() {
  const token = localStorage.getItem("investify_token");

  // --------------------------------
  // STATES
  // --------------------------------
  const [wallets, setWallets] = useState([]);
  const [walletsLoaded, setWalletsLoaded] =
    useState(false);

  const [selectedCoinIndex, setSelectedCoinIndex] =
    useState(0);

  const [
    selectedNetworkIndex,
    setSelectedNetworkIndex,
  ] = useState(0);

  const [uploadingQR, setUploadingQR] =
    useState(false);

  const [uploadingLogo, setUploadingLogo] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  // --------------------------------
  // FETCH WALLETS
  // --------------------------------
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await fetch(
          `${apiEntry}/users/getwallets`
        );

        const data = await res.json();

        if (data.success) {
          setWallets(data.result);

          toast.success(
            "Wallets loaded"
          );
        } else {
          toast.error(
            data.result ||
              "Failed to load wallets"
          );
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setWalletsLoaded(true);
      }
    };

    fetchWallets();
  }, []);

  // --------------------------------
  // CURRENT DATA
  // --------------------------------
  const selectedCoin =
    wallets?.[selectedCoinIndex];

  const currentNetwork =
    selectedCoin?.networks?.[
      selectedNetworkIndex
    ];

  // --------------------------------
  // UPDATE HELPERS
  // --------------------------------
  const updateWallets = (updater) => {
    setWallets((prev) => updater(prev));
  };

  const updateAddress = (value) => {
    updateWallets((prev) =>
      prev.map((coin, i) =>
        i !== selectedCoinIndex
          ? coin
          : {
              ...coin,

              networks:
                coin.networks.map(
                  (n, j) =>
                    j !==
                    selectedNetworkIndex
                      ? n
                      : {
                          ...n,
                          address: value,
                        }
                ),
            }
      )
    );
  };

  const updateNetworkName = (
    value
  ) => {
    updateWallets((prev) =>
      prev.map((coin, i) =>
        i !== selectedCoinIndex
          ? coin
          : {
              ...coin,

              networks:
                coin.networks.map(
                  (n, j) =>
                    j !==
                    selectedNetworkIndex
                      ? n
                      : {
                          ...n,
                          network: value,
                        }
                ),
            }
      )
    );
  };

  const updateCoinName = (
    value
  ) => {
    updateWallets((prev) =>
      prev.map((coin, i) =>
        i !== selectedCoinIndex
          ? coin
          : {
              ...coin,
              name: value,
            }
      )
    );
  };

  // --------------------------------
  // QR UPLOAD
  // --------------------------------
  const uploadQr = async (
    file
  ) => {
    if (!file) return;

    try {
      setUploadingQR(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "upload_preset",
        "investify"
      );

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dszf8uvsn/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await res.json();

      if (!data.secure_url) {
        toast.error(
          "QR upload failed"
        );

        return;
      }

      updateWallets((prev) =>
        prev.map((coin, i) =>
          i !== selectedCoinIndex
            ? coin
            : {
                ...coin,

                networks:
                  coin.networks.map(
                    (n, j) =>
                      j !==
                      selectedNetworkIndex
                        ? n
                        : {
                            ...n,
                            qrcode:
                              data.secure_url,
                          }
                  ),
              }
        )
      );

      toast.success(
        "QR updated"
      );
    } catch (err) {
      toast.error(
        err.message
      );
    } finally {
      setUploadingQR(false);
    }
  };

  // --------------------------------
  // LOGO UPLOAD
  // --------------------------------
  const uploadLogo = async (
    file
  ) => {
    if (!file) return;

    try {
      setUploadingLogo(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "upload_preset",
        "investify"
      );

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dszf8uvsn/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await res.json();

      if (!data.secure_url) {
        toast.error(
          "Logo upload failed"
        );

        return;
      }

      updateWallets((prev) =>
        prev.map((coin, i) =>
          i !== selectedCoinIndex
            ? coin
            : {
                ...coin,
                logo:
                  data.secure_url,
              }
        )
      );

      toast.success(
        "Logo updated"
      );
    } catch (err) {
      toast.error(
        err.message
      );
    } finally {
      setUploadingLogo(false);
    }
  };

  // --------------------------------
  // ADD NETWORK
  // --------------------------------
  const addNetwork = () => {
    updateWallets((prev) =>
      prev.map((coin, i) =>
        i !== selectedCoinIndex
          ? coin
          : {
              ...coin,

              networks: [
                ...coin.networks,

                {
                  network:
                    "mainnet",

                  address: "",

                  qrcode: "",
                },
              ],
            }
      )
    );

    setSelectedNetworkIndex(
      selectedCoin.networks.length
    );
  };

  // --------------------------------
  // REMOVE NETWORK
  // --------------------------------
  const removeNetwork = (
    index
  ) => {
    if (
      selectedCoin.networks.length <=
      1
    ) {
      return toast.error(
        "At least one network required"
      );
    }

    updateWallets((prev) =>
      prev.map((coin, i) =>
        i !== selectedCoinIndex
          ? coin
          : {
              ...coin,

              networks:
                coin.networks.filter(
                  (_, j) =>
                    j !== index
                ),
            }
      )
    );

    setSelectedNetworkIndex(0);
  };

  // --------------------------------
  // ADD COIN
  // --------------------------------
  const addCoin = () => {
    updateWallets((prev) => [
      ...prev,

      {
        coin: `coin-${Date.now()}`,

        name: "New Coin",

        logo: "",

        networks: [
          {
            network:
              "mainnet",

            address: "",

            qrcode: "",
          },
        ],
      },
    ]);

    setSelectedCoinIndex(
      wallets.length
    );

    setSelectedNetworkIndex(0);
  };

  // --------------------------------
  // REMOVE COIN
  // --------------------------------
  const removeCoin = (
    index
  ) => {
    if (wallets.length <= 1) {
      return toast.error(
        "At least one coin required"
      );
    }

    updateWallets((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );

    setSelectedCoinIndex(0);

    setSelectedNetworkIndex(0);
  };

  // --------------------------------
  // SAVE
  // --------------------------------
  const saveWallets =
    async () => {
      try {
        setSaving(true);

        const res = await fetch(
          `${apiEntry}/users/setwallets`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              token,
            },

            body: JSON.stringify(
              wallets
            ),
          }
        );

        const data =
          await res.json();

        if (data.success) {
          toast.success(
            data.result
          );
        } else {
          toast.error(
            data.result
          );
        }
      } catch (err) {
        toast.error(
          err.message
        );
      } finally {
        setSaving(false);
      }
    };

  // --------------------------------
  // LOADING
  // --------------------------------
  if (!walletsLoaded) {
    return (
      <div className="wallet-loader">
        <Loader />
      </div>
    );
  }

  // --------------------------------
  // RENDER
  // --------------------------------
  return (
    <div className="edit-wallet-page">
      {/* LEFT */}
      <div className="wallet-editor">
        <h2>Wallet Admin</h2>

        {/* COINS */}
        <div className="wallet-tabs">
          {wallets.map(
            (coin, i) => (
              <div
                key={coin.coin}
              >
                <button
                  className={
                    i ===
                    selectedCoinIndex
                      ? "active-wallet-tab"
                      : ""
                  }
                  onClick={() => {
                    setSelectedCoinIndex(
                      i
                    );

                    setSelectedNetworkIndex(
                      0
                    );
                  }}
                >
                  {coin.name}
                </button>

                <button
                  onClick={() =>
                    removeCoin(
                      i
                    )
                  }
                >
                  ✕
                </button>
              </div>
            )
          )}

          <button
            onClick={
              addCoin
            }
          >
            + Add Coin
          </button>
        </div>

        {/* LOGO */}
        <div className="form-group">
          <label>
            Coin Logo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              uploadLogo(
                e.target
                  .files?.[0]
              )
            }
          />

          {uploadingLogo && (
            <Loader />
          )}
        </div>

        {/* COIN NAME */}
        <div className="form-group">
          <label>
            Coin Name
          </label>

          <input
            value={
              selectedCoin?.name ||
              ""
            }
            onChange={(e) =>
              updateCoinName(
                e.target.value
              )
            }
          />
        </div>

        {/* NETWORKS */}
        <div className="network-tabs">
          {selectedCoin?.networks.map(
            (n, i) => (
              <div key={i}>
                <button
                  className={
                    i ===
                    selectedNetworkIndex
                      ? "active-network-tab"
                      : ""
                  }
                  onClick={() =>
                    setSelectedNetworkIndex(
                      i
                    )
                  }
                >
                  {
                    n.network
                  }
                </button>

                <button
                  onClick={() =>
                    removeNetwork(
                      i
                    )
                  }
                >
                  ✕
                </button>
              </div>
            )
          )}

          <button
            onClick={
              addNetwork
            }
          >
            + Add Network
          </button>
        </div>

        {/* NETWORK */}
        <div className="form-group">
          <label>
            Network
          </label>

          <input
            value={
              currentNetwork?.network ||
              ""
            }
            onChange={(e) =>
              updateNetworkName(
                e.target.value
              )
            }
          />
        </div>

        {/* ADDRESS */}
        <div className="form-group">
          <label>
            Address
          </label>

          <textarea
            value={
              currentNetwork?.address ||
              ""
            }
            onChange={(e) =>
              updateAddress(
                e.target.value
              )
            }
          />
        </div>

        {/* QR */}
        <div className="form-group">
          <label>
            QR Code
          </label>

          <input
            type="file"
            onChange={(e) =>
              uploadQr(
                e.target
                  .files?.[0]
              )
            }
          />

          {uploadingQR && (
            <Loader />
          )}
        </div>

        {/* SAVE */}
        <button
          onClick={saveWallets}
          disabled={saving}
        >
          {saving ? (
            <>
              Saving{" "}
              <Loader />
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>

      {/* RIGHT */}
      <div className="wallet-preview">
        <h2>Preview</h2>

        <img
          src={
            selectedCoin?.logo
          }
          width={120}
        />

        <h3>
          {selectedCoin?.name}
        </h3>

        <p>
          {
            currentNetwork?.network
          }
        </p>

        <p>
          {
            currentNetwork?.address
          }
        </p>

        {currentNetwork?.qrcode ? (
          <img
            src={
              currentNetwork.qrcode
            }
            width={120}
          />
        ) : (
          <p>No QR</p>
        )}
      </div>
    </div>
  );
}