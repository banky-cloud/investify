import { IoMdSwap } from "react-icons/io";
import "./deposit.css";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiHandDeposit } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { RiSwap2Line } from "react-icons/ri";
import { CiRoute } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { useEffect, useMemo, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { RiFileCopy2Line } from "react-icons/ri";
import toast from "react-hot-toast";

import uploadImage from "../../assets/upload image.png";

import { apiEntry } from "../register/register";
import Loader from "../../components/spinner";

export const logout = (nav) => {
  const canProceed = window.confirm(
    "Are you sure you want to log out?"
  );

  if (canProceed) {
    localStorage.removeItem("investify_token");
    nav("/");
  }
};

export default function Deposit() {
  const token = localStorage.getItem(
    "investify_token"
  );

  const navigate = useNavigate();

  // -----------------------------------
  // STATES
  // -----------------------------------
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [isFiat, setIsFiat] =
    useState(false);

  const [wallets, setWallets] = useState([]);

  const [walletsLoading, setWalletsLoading] =
    useState(true);

  const [coinIndex, setCoinIndex] =
    useState(0);

  const [networkIndex, setNetworkIndex] =
    useState(0);

  const [amount, setAmount] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [checkCount, setCheckCount] =
    useState(0);

  const [file, setFile] = useState();

  const [imgUrl, setImgUrl] =
    useState(uploadImage);

  const [imgUploading, setImgUploading] =
    useState(false);

  // -----------------------------------
  // FETCH WALLETS
  // -----------------------------------
  useEffect(() => {
    if (!token) {
      alert(
        "Session expired, Please log in again"
      );
      navigate("/login");
      return;
    }

    const fetchWallets = async () => {
      try {
        setWalletsLoading(true);

        const res = await fetch(
          `${apiEntry}/users/getwallets`
        );

        const data = await res.json();

        if (data.success) {
          setWallets(data.result || []);
        } else {
          toast.error(
            data.result ||
              "Failed to fetch wallets"
          );
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setWalletsLoading(false);
      }
    };

    fetchWallets();
  }, []);

  // -----------------------------------
  // CURRENT COIN
  // -----------------------------------
  const currentCoin = wallets[coinIndex];

  const currentNetwork =
    currentCoin?.networks?.[
      networkIndex
    ];

  const address =
    currentNetwork?.address || "";

  const qrcode =
    currentNetwork?.qrcode || "";

  // -----------------------------------
  // SIDEBAR LINKS
  // -----------------------------------
  const links = [
    {
      path: "deposit",
      Icon: PiHandDeposit,
      highlighted: true,
    },
    {
      path: "dashboard",
      Icon: LuLayoutDashboard,
    },
    {
      path: "trade",
      Icon: RiSwap2Line,
    },
    {
      path: "withdraw",
      Icon: CiRoute,
    },
  ];

  // -----------------------------------
  // CHANGE COIN
  // -----------------------------------
  const handleCoinChange = (e) => {
    setCoinIndex(Number(e.target.value));
    setNetworkIndex(0);
  };

  // -----------------------------------
  // COPY ADDRESS
  // -----------------------------------
  const handleCopy = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success(
          "Address copied successfully"
        );
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // -----------------------------------
  // IMAGE UPLOAD
  // -----------------------------------
  useEffect(() => {
    const uploadImg = async () => {
      if (!file) {
        if (checkCount > 0) {
          toast.error("No file selected");
        }

        setCheckCount((prev) => prev + 1);
        return;
      }

      try {
        setImgUploading(true);

        const formData = new FormData();

        formData.append("file", file);

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

        const data = await res.json();

        if (data.secure_url) {
          setImgUrl(data.secure_url);
          toast.success(
            "Proof uploaded successfully"
          );
        } else {
          toast.error(
            "Image upload failed"
          );
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setImgUploading(false);
      }
    };

    uploadImg();
  }, [file]);

  // -----------------------------------
  // SUBMIT DEPOSIT
  // -----------------------------------
  const submitDeposit = async (e) => {
    e.preventDefault();

    if (!amount) {
      toast.error(
        "Amount sent is required"
      );
      return;
    }

    if (!imgUrl || imgUrl === uploadImage) {
      toast.error(
        "Please upload proof of payment"
      );
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${apiEntry}/transactions/deposit`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            token,
          },
          body: JSON.stringify({
            amount,
            isFiat,
            network:
              currentNetwork?.network,
            coin: currentCoin?.name,
            address,
            imgUrl,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.result);
        navigate("/dashboard");
      } else {
        toast.error(
          data.result ||
            "Deposit failed"
        );
      }
    } catch (err) {
      toast.error(
        "Failed to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------
  // LOADING SCREEN
  // -----------------------------------
  if (walletsLoading) {
    return (
      <div className="deposit-page-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="deposit-page-con">
      {/* MOBILE NAV */}
      <div
        className="deposit-responsive-nav"
        style={{
          transform: `translateX(${
            menuOpen ? "0px" : "100vw"
          })`,
        }}
      >
        <div className="relative">
          {links.map((link) => {
            const { path, Icon } = link;

            return (
              <a
                key={path}
                href={`/${path}`}
                className={`deposit-sidebar-link ${
                  link.highlighted &&
                  "highlighted"
                }`}
              >
                <Icon
                  style={{
                    marginLeft: "20px",
                  }}
                  size={20}
                />

                {path}
              </a>
            );
          })}

          <div
            className="deposit-logout-btn text-dark"
            style={{
              position: "relative",
              top: "50px",
            }}
          >
            <AiOutlineLogout
              style={{ color: "black" }}
              onClick={() =>
                logout(navigate)
              }
            />

            Log out
          </div>
        </div>
      </div>

      {/* HAMBURGER */}
      <div
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
        className="deposit-ham"
      >
        <div
          className={`deposit-ham-line ${
            menuOpen &&
            "ham-top bg-dark"
          }`}
        ></div>

        <div
          className={`deposit-ham-line ${
            menuOpen &&
            "ham-bottom bg-dark"
          }`}
        ></div>
      </div>

      {/* LEFT */}
      <div className="deposit-left-con">
        <div id="deposit-logo">
          Investify
        </div>

        <div className="deposit-sidebar-links">
          {links.map((link) => {
            const { path, Icon } = link;

            return (
              <a
                key={path}
                href={`/${path}`}
                className={`deposit-sidebar-link ${
                  link.highlighted &&
                  "highlighted"
                }`}
              >
                <Icon
                  style={{
                    marginLeft: "20px",
                  }}
                  size={20}
                />

                {path}
              </a>
            );
          })}
        </div>

        <div className="deposit-logout-btn">
          <AiOutlineLogout
            onClick={() =>
              logout(navigate)
            }
          />

          Log out
        </div>
      </div>

      {/* CENTER */}
      <div className="deposit-center">
        <div className="deposit">
          Deposit
        </div>

        <div className="deposit-type-btns">
          <button
            onClick={() =>
              setIsFiat(false)
            }
            className={
              !isFiat
                ? "deposit-type-btn active-deposit-type"
                : "deposit-type-btn"
            }
          >
            Crypto
          </button>

          <button
            onClick={() =>
              setIsFiat(true)
            }
            className={
              isFiat
                ? "deposit-type-btn active-deposit-type"
                : "deposit-type-btn"
            }
          >
            Fiat
          </button>
        </div>

        <form
          action=""
          onSubmit={submitDeposit}
        >
          {/* COIN */}
          <label
            className="deposit-label"
            htmlFor="coin"
          >
            Coin:
          </label>

          <div className="input-maybe">
            <select
              onChange={handleCoinChange}
              id="coin"
              className="form-control bg-dark text-light"
            >
              {wallets.map(
                (coin, index) => (
                  <option
                    key={coin.coin}
                    value={index}
                  >
                    {coin.name}
                  </option>
                )
              )}
            </select>

            {currentCoin?.logo && (
              <img
                style={{
                  width: "37px",
                  height: "37px",
                  objectFit: "contain",
                }}
                alt="selectedCoin"
                src={currentCoin.logo}
              />
            )}
          </div>

          {/* ADDRESS */}
          <label className="deposit-label down-label">
            Address:
            <span id="address">
              {" "}
              {address}
            </span>
          </label>

          <div className="bg-dark input-maybe address-con">
            Click to copy Address

            <div
              onClick={handleCopy}
              className="address-copy-btn bg-success"
            >
              <RiFileCopy2Line /> Copy
            </div>
          </div>

          {/* AMOUNT */}
          <label
            htmlFor="amount"
            className="deposit-label down-label"
          >
            Amount:
          </label>

          <div className="bg-dark input-maybe address-con deposit-borderless-con">
            <input
              id="amount"
              onChange={(e) =>
                setAmount(
                  Math.abs(
                    e.target.value
                  )
                )
              }
              type="number"
              className="form-control bg-dark text-light"
            />
          </div>

          {/* PROOF */}
          <div className="bg-dark input-maybe address-con deposit-borderless-con">
            <input
              id="proof"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0]
                )
              }
              type="file"
              className="form-control bg-dark text-light"
            />
          </div>

          <label
            className="proof-label"
            htmlFor="proof"
          >
            {imgUploading ? (
              <Loader
                size={{
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            ) : (
              <img
                width={70}
                src={imgUrl}
              />
            )}
          </label>

          {/* SUBMIT */}
          <div className="input-maybe address-con deposit-borderless-con">
            <button
              disabled={loading}
              className="w-40 btn btn-success"
            >
              I've made the deposit ✔{" "}
              {loading && (
                <Loader
                  style={{
                    width: "1rem",
                    height: "1rem",
                  }}
                />
              )}
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT */}
      <div className="deposit-right-con">
        <div className="deposit-network-title">
          Deposit Network{" "}
          <HiOutlineInformationCircle />
        </div>

        <div className="network-btns">
          {currentCoin?.networks?.map(
            (network, index) => (
              <button
                key={index}
                onClick={() =>
                  setNetworkIndex(index)
                }
                className={`network-selector-btn ${
                  index ===
                    networkIndex &&
                  "bg-success"
                }`}
              >
                {network.network}
              </button>
            )
          )}
        </div>

        {qrcode && (
          <img
            src={qrcode}
            alt="qr"
            className="qrcode"
          />
        )}
      </div>
    </div>
  );
}