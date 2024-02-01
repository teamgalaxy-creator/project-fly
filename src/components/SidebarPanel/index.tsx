import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import airportsData from '~data/airports.json';
import './style.css';
import { IAnimationUIOptions } from '~components/AnimationView';
import { Autocomplete, TextField } from '@mui/material';
import { LngLatLike } from 'maplibre-gl';
import { useSelector } from '~/redux/reducers';
import { TravelFormData } from '~/utility/models';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';

type SideBarPanelProps = {
  isCollapsed: boolean;
  togglePanel: any;
  onAnimateButtonClick: any;
  onVisualizePathClick: any;
  onFormClick: any;
  onItineraryClick: any;
  onCarAnimClick: any;
};

type AirportProps = {
  value: string;
  text: string;
  coordinates: LngLatLike;
};

interface Options {
  value: string;
  label: string;
  text: string;
  code: string;
  coordinates: LngLatLike;
}

interface AnimationPoints {
  origin: Options;
  destination: Options;
}

const SidebarPanel = ({
  isCollapsed,
  togglePanel,
  onAnimateButtonClick,
  onVisualizePathClick,
  onCarAnimClick,
}: SideBarPanelProps) => {
  const [selectedOrigin, setSelectedOrigin] = useState<Options | null>(null);
  const [secondDestination, setSecondDestination] = useState();

  const [selectedDestination, setSelectedDestination] =
    useState<Options | null>(null);
  const [selectedLineType, setSelectedLineType] = useState('simple');
  const [shouldAnimateLine, setShouldAnimateLine] = useState(true);
  const [planeSize, setPlaneSize] = useState(1.0);
  const [curveSpeed, setCurveSpeed] = useState(0.0175);
  const [animationDuration, setAnimationDuration] = useState(5.0);
  const [curveHeight, setCurveHeight] = useState(100.0);
  const [cameraZoom, setCameraZoom] = useState(4.0);
  const [mapPitch, setMapPitch] = useState(35.0);
  const [mapBearing, setMapBearing] = useState(35.0);
  const [planeGrow, setPlaneGrow] = useState(15.0);
  const [options, setOptions] = useState<Options[]>([]);

  const travelPointsArray = useRef<AnimationPoints[]>([]);

  const travelArray: TravelFormData[] = useSelector(
    (state: any) => state.MapReducers.pointsArray,
  );

  const handleOriginSelect = (airport: Options) => {
    setSelectedOrigin(airport);
  };

  const handleAnotherDest = () => {
    if (selectedOrigin && selectedDestination) {
      const point = {
        origin: selectedOrigin,
        destination: selectedDestination,
      };
      travelPointsArray.current.push(point);
    }
  };

  const handleDestinationSelect = (airport: Options) => {
    setSelectedDestination(airport);
  };

  const handleLineTypeSelect = (type: string) => {
    setSelectedLineType(type);
  };

  const handleShouldAnimateSelect = (value: any) => {
    setShouldAnimateLine(value);
  };

  const handleAnimateClick = () => {
    const animationOptions = {
      animationPoints: travelPointsArray.current,
      animated: shouldAnimateLine,
      data: null,
      UIConfig: {
        planeSize: planeSize,
        curveSpeed: curveSpeed,
        animationDuration: animationDuration,
        curveHeight: curveHeight,
        cameraZoom: cameraZoom,
        mapPitch: mapPitch,
        mapBearing: mapBearing,
        planeGrow: planeGrow,
      },
    } as unknown as IAnimationUIOptions;

    onAnimateButtonClick(animationOptions);
  };

  const handleSearch = async (query: string) => {
    const options = await fetchOpenRouteFromAPI(query);
    // Assume that you have an asynchronous function to fetch options
    const newOptions = await fetchOptionsFromAPI(query);

    // (newOptions);

    setOptions(newOptions);
  };

  const fetchOptionsFromAPI = async (query: string) => {
    const apiKey = 'c124be2c655a489393be58dbfc54a6fc';
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      query,
    )}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      // (data.results);

      const newOptions = data.results.map((result: any) => ({
        value: result.formatted,
        label: result.formatted,
        text: result.formatted,
        code: result.components.country_code,
        coordinates: [result.geometry.lng, result.geometry.lat], // Adjust this as per your API response
      }));

      return newOptions;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  var container = document.getElementById('jsoneditor');
  var optionss = {
    mode: 'tree',
  };
  var editor = new JSONEditor(
    container as HTMLElement,
    optionss as JSONEditorOptions,
  );

  var json = {
    mapCurveHeight: 0,
    mapPitch: 0,
    mapBearing: 0,
    mapZoom: 0,
    modelSize: 0,
    modelGrowthPercentage: 0,
    curveSpeed: 0,
  };
  editor.set(json);

  const fetchOpenRouteFromAPI = async (query: string) => {
    const apiKey = '5b3ce3597851110001cf6248fffbf74ba0654bbba8c877e711108c8c';
    const apiUrl = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
      query,
    )}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const newOptions = data.features.map((result: any) => ({
        value: result.properties.name,
        label: result.properties.name,
        text: result.properties.name,
        code: result.properties.country_a,
        coordinates: result.geometry.coordinates, // Adjust this as per your API response
      }));

      return newOptions;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  const handleVisualizePathClick = () => {
    onVisualizePathClick();
  };

  return (
    <div className={`panel-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="panel-header">
        <Button
          variant="light"
          className="panel-toggle-btn"
          onClick={togglePanel}
        >
          {isCollapsed ? '\u25C0' : '\u25B6'}
        </Button>
      </div>
      <div
        className="panel-content"
        style={{ display: isCollapsed ? 'none' : 'block' }}
      >
        <div id="jsoneditor" style={{ width: '400px', height: '400px' }}></div>

        {/* <div style={{ margin: '20px' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            autoComplete
            filterOptions={(x) => x}
            includeInputInList
            filterSelectedOptions
            noOptionsText="No locations"
            sx={{ width: 250 }}
            onChange={(e, newValue) => {
              setOptions([]);

              if (newValue) {
                handleAnotherDest(newValue);
              }
            }}
            onInputChange={(e, newInputValue) => {
              handleSearch(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="2nd Dest" fullWidth />
            )}
          />
        </div> */}

        {/* <Row style={{ marginTop: "20px" }}>
          <h4 className="panel-heading">Path Config</h4>
          <p className="panel-subheading">Type:</p>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="linetype-dropdown">
              {selectedLineType === "simple" ? "Simple" : "Dashed"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleLineTypeSelect("simple")}>
                Simple
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLineTypeSelect("dashed")}>
                Dashed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>

        <Row>
          <p className="panel-subheading">Animate Line:</p>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="lineanimate-dropdown">
              {shouldAnimateLine ? "Yes" : "No"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleShouldAnimateSelect(true)}>
                Yes
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleShouldAnimateSelect(false)}>
                No
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row> */}

        <Row>
          <div className="customization-input">
            <label>Plane Size:</label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              value={planeSize}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setPlaneSize(newValue);
              }}
              className="input-field"
            />
          </div>
          <div className="customization-input">
            <label>Duration(sec):</label>
            <input
              type="number"
              min="0.5"
              max="20"
              step="0.1"
              value={animationDuration}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setAnimationDuration(newValue);
              }}
              className="input-field"
            />
          </div>
          <div className="customization-input">
            <label>Curve speed:</label>
            <input
              type="number"
              min="0.01"
              max="2"
              step="0.01"
              value={curveSpeed}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setCurveSpeed(newValue);
              }}
              className="input-field"
            />
          </div>
          <div className="customization-input">
            <label>Curve Height:</label>
            <input
              type="number"
              min="0"
              max="1000"
              step="100.0"
              value={curveHeight}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setCurveHeight(newValue);
              }}
              className="input-field"
            />
          </div>
          <div className="customization-input">
            <label>Camera Zoom:</label>
            <input
              type="number"
              min="1"
              max="8"
              step="0.5"
              value={cameraZoom}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setCameraZoom(newValue);
              }}
              className="input-field"
            />
          </div>
          <div className="customization-input">
            <label>Map Pitch:</label>
            <input
              type="number"
              min="0"
              max="85"
              step="0.5"
              value={mapPitch}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setMapPitch(newValue);
              }}
              className="input-field"
            />
          </div>
          <div className="customization-input">
            <label>Map Bearing:</label>
            <input
              type="number"
              min="0"
              max="360"
              step="1"
              value={mapBearing}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setMapBearing(newValue);
              }}
              className="input-field"
            />
          </div>
          <div className="customization-input">
            <label>Plane Scale Grow Percentage:</label>
            <input
              type="number"
              min="0"
              max="100"
              step="5"
              value={planeGrow}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setPlaneGrow(newValue);
              }}
              className="input-field"
            />
          </div>
        </Row>

        <Button className="animate-button" onClick={handleAnimateClick}>
          Animate
        </Button>
      </div>
      <Button
        style={{ margin: '10px' }}
        className="animate-button"
        onClick={handleAnotherDest}
      >
        Add Destination
      </Button>
    </div>
  );
};

export default SidebarPanel;
